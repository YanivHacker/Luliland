const mongoose = require('mongoose');
const Comment = require('../Models/Comment');
const Post = require("../Models/Post");

const readComments = async (req,res) =>{
    let sent = false;
    try {
        const {postId} = req.params
        await Comment.find({postID: postId}, function(error, result){
            if(error || !result) {
                res.status(404).send("Didn't find comment or error occurred.");
                sent = true;
            }
            else res.status(200).json(result);
        }).clone();
    } catch (err) {
        if(!sent)
            res.status(404).json({error: err.message});
    }
}

const getCommentById = async (req,res) => {
    let sent = false;
    try{
        const {id} = req.params;
        if(!Comment.isValidObjectId(id)) {
            return res.status(404).send(`the id ${id} is not valid`);
            sent = true;
        }
        await Comment.findOne({_id:id}, function(error, result){
            if(error || !result){
                if(!sent)
                    res.status(404).send("Didn't find message or error occurred.");
            }
            else res.status(200).json(result);
        }).clone();
    }catch(err) {
        if(!sent)
            res.status(404).json({error: err.message});
    }
}

const createComment = async (req,res) => {
    let sent = false;
    try {
        const {postID, content} = req.body
        await Post.findById(postID, function(error, result){
            if(error || !result) {
                res.status(404).send("Error with finding post for comment creation.");
                sent = true;
            }
        }).clone();
        const comment = new Comment({postID: postID, content: content});
        await comment.save();
        if(!sent)
            res.status(200).json(comment);
    } catch (error) {
        if(!sent)
            res.status(404).json({ message:error });
    }
}
// const updateComment = async (req,res) => {
//     const {id} = req.params;
//     const {postID, content, images, creationDate, isDeleted} = req.body;
//     validateComment(content, images);
//     if(!mongoose.isValidObjectId(id))
//         return res.status(404).send(`the id ${id} is not valid`);
//     const comment = {_id:id, userEmail, postID, content, images, creationDate, isDeleted};
//     await   Comment.findByIdAndUpdate(id,req.body);
//     res.json(comment);
// }

const deleteComment = async (req,res) => {
    const {id} = req.params;
    let sent = false;
    if(!Comment.isValidObjectId(id)) {
        res.status(404).send(`the id ${id} is not valid`);
        sent = true;
    }
    await Comment.findByIdAndUpdate(id,{isDeleted: true}, function(error, result){
        if(error && !sent)
            res.status(400).send("Deletion of comment " + id + " failed with error " + error);
    }).clone();
    if(!sent)
        res.status(200).send("Comment deleted successfully.");
}

module.exports = {readComments, createComment, deleteComment,getCommentById};
