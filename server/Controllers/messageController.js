const Message = require('../Models/Message')
const Conversation = require("../Models/Conversation")

//add message
const sendMessage = async (req,res) => {
    let sent = false;
    try{
        const {conversationId, sender, content} = req.body;
        if(!content || !sender || !conversationId || content.length === 0)
        {
            res.status(400).send("Please provide conversation id, sender and content.");
            sent = true;
        }
        let response = await Conversation.findById(conversationId, function(err, result){
            if(err || !result){
                if(!sent) {
                    res.status(400).send("Conversation ID not found.");
                    sent = true;
                }
            }
            if(!result.members.contains(sender))
            {
                if(!sent) {
                    res.status(400).send("This user is not in this conversation");
                    sent = true;
                }
            }
        })
        const newMessage = new Message(req.body)
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err) {
        res.status(500).json(err)
    }
}

const getMessages = async (req,res) => {
    try{
        await Message.find({
            conversationId:req.params.conversationId
        }).clone().then(messages => res.status(200).json(messages));
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {sendMessage, getMessages}