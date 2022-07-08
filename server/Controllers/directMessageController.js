const Mongoose = require('mongoose')
const DmMessage =  require("../Models/DirectMessage");
const User = require('../Models/User')

const getAllDmMessage = async (req,res)=>{
    try{
        const dmMessages = await DmMessage.find().clone();
        res.status(200).json(dmMessages);
    } catch (err){
        res.status(404).json({error: err.message});
    }
}

const getChat = async (req,res) => {
    try{
        const usersEmail = [req.body.user1Email, req.body.user2Email];
        //check if both users are existing in db
        const user1 = await User.find({email: req.body.user1Email}).clone()
            .catch(err => res.status(400).json({error: `user ${req.body.user1Email} doesn't exist`}));
        const user2 = await User.find({email: req.body.user2Email}).clone()
            .catch(err => res.status(400).json({error: `user ${req.body.user1Email} doesn't exist`}));
        const relevantMessages = DmMessage.find({senderEmail: {$in: usersEmail}, receiverEmail: {$in: usersEmail}}).clone();
        res.status(200).json(relevantMessages)
    }catch (err){
        res.status(404).json({error: err.message})
    }
}

const sendDm = async (req, res) => {
    try{
        const sender = await User.find({email: req.body.senderEmail, isDeleted: false}).clone()
            .catch(err => res.status(400).json({error: `user ${req.body.senderEmail} doesn't exist`}));
        const receiver = await User.find({email: req.body.receiverEmail, isDeleted: false}).clone()
            .catch(err => res.status(400).json({error: `user ${req.body.receiverEmail} doesn't exist`}));
        if(req.body.content.length === 0)
            res.status(400).json({'error': 'message should not be empty'});
        const dm = new DmMessage({senderEmail: req.body.senderEmail,receiverEmail: req.body.receiver,image:req.body.image,content: req.body.content, creationDate: new Date(Date.now())})
        await dm.save();
        res.status(200).json(dm);
    }catch (err) {
        res.status(404).json({error: err.message});
    }
}

module.exports = {sendDm,getChat,getAllDmMessage};