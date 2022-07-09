const Message = require('../Models/Message')

//add message
const sendMessage = async (req,res) => {
    try{
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