import {Conversation} from "../Models/Conversation"

//new conv
export const newConversation = async (req,res) => {
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

//get conv of user
export const getConversation = async (req,res) => {
    try{
        const conversation = await Conversation.find({
            members: { $in:[req.params.userId]}
        });
        res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err)
    }
}
