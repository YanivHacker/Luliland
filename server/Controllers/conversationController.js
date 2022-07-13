const Conversation = require("../Models/Conversation")

//new conv
const newConversation = async (req,res) => {
    try{
        const conversation = new Conversation({
            members: [req.body.senderEmail, req.body.receiverEmail]
        });
        await conversation.save()
        res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err)
    }
}

//get all conv of user
const getAllConversation = async (req, res) => {
    try{
        const conversation = await Conversation.find({
            members: { $in:[req.params.userEmail]}
        }).clone().then(conversations => res.status(200).json(conversations));
    }catch(err){
        res.status(500).json(err)
    }
}

const getSpecificConversationBuUsers = async (req, res) => {
    try{
        const userEmail1 = req.query.userEmail1
        const userEmail2 = req.query.userEmail2
        await Conversation.findOne({
            $and: [
                {members: { $in:[userEmail1]}},
                {members: { $in:[userEmail2]}}
            ]
        }).clone().then(conversations => res.status(200).json(conversations));
    }catch(err){
        res.status(500).json(err)
    }
}



module.exports = {newConversation, getAllConversation, getSpecificConversationBuUsers}