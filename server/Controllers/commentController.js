const mongoose = require('mongoose');
const Comment = require('../Models/Comment');
const Post = require("../Models/Post");

const readComments = async (req,res) =>{
    try {
        const {postId} = req.params
        await Comment.find({postID: postId}, function(error, result){
            if(error || !result)
                res.status(404).send("Didn't find comment or error occurred.");
            else res.status(200).json(result);
        });
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

const getCommentById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!Comment.isValidObjectId(id))
            return res.status(404).send(`the id ${id} is not valid`);
        await Comment.findOne({_id:id}, function(error, result){
            if(error || !result){
                res.status(404).send("Didn't find message or error occurred.");
            }
            else res.status(200).json(result);
        });
    }catch(err) {
        res.status(404).json({error: err.message});
    }
}

const createComment = async (req,res) => {
    try {
        const {postID, content} = req.body
        await Post.findById(postID, function(error, result){
            if(error || !result)
                res.status(404).send("Error with finding post for comment creation.");
        })
        const comment = new Comment({postID: postID, content: content});
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
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
    if(!Comment.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    await Comment.findByIdAndUpdate(id,{isDeleted: true}, function(error, result){
        if(error)
            res.status(400).send("Deletion of comment " + id + " failed with error " + error);
    });
    res.status(200).send("Comment deleted successfully.");
}

module.exports = {readComments, createComment, deleteComment,getCommentById};
