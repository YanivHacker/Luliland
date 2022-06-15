const mongoose = require('mongoose');
const Comment = require('../Models/Comment');

const readComments = async (req,res) =>{
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

const validateComment = async (content, images) => {
    if((!content || content.length == 0) && (!images || images.length == 0)){
        alert('Cannot send an empty comment, please enter images/content');
        res.status(400).json(post);
    }
}

const getCommentById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id))
            return res.status(404).send(`the id ${id} is not valid`);
        const comment = await Comment.findOne({_id:id});
        res.status(200).json(comment);

    }catch(err) {
        res.status(404).json({error: err.message});
    }
}

const createComment = async (req,res) => {
    try {
        validateComment(req.body.content, req.body.images);
        const comment = new Post(req.body);
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}

const updateComment = async (req,res) => {
    const {id} = req.params;
    const {postID, content, images, creationDate, isDeleted} = req.body;
    validateComment(content, images);
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const comment = {_id:id, userEmail, postID, content, images, creationDate, isDeleted};
    await   Comment.findByIdAndUpdate(id,req.body);
    res.json(comment);
}

const deleteComment = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const comment = await Comment.findByIdAndUpdate(id,{isDeleted: true});
    res.json(comment);
}

module.exports = {readComments, createComment, updateComment, deleteComment,getCommentById};
