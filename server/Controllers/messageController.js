const Message = require('../Models/Message')

//add message
export const sendMessage = async (req,res) => {
    try{
        const newMessage = new Message(req.body)
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err) {
        res.status(500).json(err)
    }
}

export const getMessages = async (req,res) => {
    try{
        const messages = await Message.find({
            conversationId:req.params.conversationId
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err)
    }
}