const Conversation = require("../Models/Conversation")

//new conv
const newConversation = async (req,res) => {
    try{
        const conversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
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
            members: { $in:[req.params.userId]}
        }).clone().then(conversations => res.status(200).json(conversations));
    }catch(err){
        res.status(500).json(err)
    }
}

const getSpecificConversationBuUsers = async (req, res) => {
    try{
        console.log(req.query)
        const userId1 = req.query.userId1
        const userId2 = req.query.userId2
        await Conversation.findOne({
            $and: [
                {members: { $in:[userId1]}},
                {members: { $in:[userId2]}}
            ]
        }).clone().then(conversations => res.status(200).json(conversations));
    }catch(err){
        res.status(500).json(err)
    }
}



module.exports = {newConversation, getAllConversation, getSpecificConversationBuUsers}