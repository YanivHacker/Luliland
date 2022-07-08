const mongoose = require('mongoose');
const Post = require('../Models/Post');
const User = require("../Models/User");

const readPosts = async (req,res) =>{
    await Post.find({isDeleted: false}, function(err, docs) {
        if (!req || !res){
            if(err)
                return null;
            return docs;
        }
        else if (err)
            res.status(400).json({message: err});
        else if(docs) {
            res.status(200).json(docs);
        }
        else return null;
    });
}

const readCommentsByPost = async (req,res) => {
    const {postID} = req.params
    if(!Post.isValidObjectId(postID))
        res.status(404).send("No post with id " + postID);
    await Comment.find({postID: postID}, function(error, docs){
        if(error || !docs)
            res.status(400).send("No comments on this post or error occurred.");
        else res.status(200).json(docs);
    })
}

const getPostById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id))
            res.status(404).send("the id ${id} is not valid");
        await Post.findOne({_id:id}, function(error, result){
            if(error){
                res.status(404).send("Post not found.");
            }
            res.status(200).json(post);
        });
    }catch(err) {
        res.status(404).json({error: err.message});
    }
}
//
// userEmail: {type: String, require: true},
// title: {type: String, require: true},
// content: {type: String, require: false},
// images: {type: [{type: String}], default: []},
// creationDate: {type: String, require: true, default: Date.now().toString()},
// isDeleted: {type: Boolean, require: true, default: false},
// allCommentIDs: {type: [{type: String}], default: []}

const createPost = async (req,res) => {
    try {
        // validatePost(req.body.content, req.body.images)
        const {userEmail, title, content, images} = req.body
        await User.findOne({email: userEmail}, function(error, docs){
            if(error || !docs)
                res.status(400).send("No user with email " + userEmail + "exists.");
        })

        if(!title)
            res.status(400).send("Cannot create post without a title.");
        if(!content && !images)
            res.status(400).send("No content nor images in this post.");
        const post = new Post({userEmail:userEmail, title:title, content:content, images:images});
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}

const updatePost = async (req,res) => {
    const {id} = req.params;
    const {userEmail, title, content, images, allCommentIDs} = req.body;
    if(!id || !Post.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    let resDoc = {_id: id}
    await User.findOne({email: userEmail}, function(error, docs){
        if(error || !docs)
            res.status(400).send("No user email with the email provided - " + userEmail);
    })
    resDoc.userEmail = userEmail
    if(title)
        resDoc.title = title
    if(content)
        resDoc.content = content
    if(images)
        resDoc.images = images
    if(allCommentIDs)
        resDoc.allCommentIDs = allCommentIDs
    await Post.findByIdAndUpdate(id,resDoc, function(error, docs){
        if(error)
            res.status(400).send("Error in post update: " + error);
        res.status(200).json(docs)
    });
}

const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!Post.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    await Post.findByIdAndUpdate(id,{isDeleted: true}, function(error, result){
        if(error)
            res.status(400).send("Error while deleting post with ID " + id);
    });
    res.status(200).send("Post deleted successfully.");
}

module.exports = {readPosts, createPost, updatePost, deletePost,getPostById, readCommentsByPost};
