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
    let sent = false;
    const {postID} = req.params
    if(!Post.isValidObjectId(postID)) {
        res.status(404).send("No post with id " + postID);
        sent = true;
    }

    await Comment.find({postID: postID}, function(error, docs){
        if(error || !docs)
            if(!sent) {
                res.status(400).send("No comments on this post or error occurred.");
                sent = true;
            }
        else {
            if(!sent)
                res.status(200).json(docs);
        }
    })
}

const getPostById = async (req,res) => {
    let sent = false;
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id)){
            res.status(404).send("the id ${id} is not valid");
            sent = true;
        }

        await Post.findOne({_id:id}, function(error, result){
            if(error){
                if(!sent) {
                    res.status(404).send("Post not found.");
                    sent = true;
                }
            }
            if(!sent) {
                res.status(200).json(post);
                sent = true;
            }
        });
    }catch(err) {
        if(!sent) {
            res.status(404).json({error: err.message});
            sent = true;
        }
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
    let sent = false;
    try {
        // validatePost(req.body.content, req.body.images)
        const {userEmail, title, content, images} = req.body
        await User.findOne({email: userEmail}, function(error, docs){
            if(error || !docs) {
                res.status(400).send("No user with email " + userEmail + "exists.");
                sent = true;
            }
        })

        if(!title && !sent) {
            res.status(400).send("Cannot create post without a title.");
            sent = true;
        }
        if(!content && !images && !sent) {
            res.status(400).send("No content nor images in this post.");
            sent = true;
        }
        const post = new Post({userEmail:userEmail, title:title, content:content, images:images});
        await post.save();
        if(!sent)
            res.status(200).json(post);
    } catch (error) {
        if(!sent)
            res.status(404).json({ message:error });
    }
}

const updatePost = async (req,res) => {
    let sent = false;
    const {id} = req.params;
    const {userEmail, title, content, images, allCommentIDs} = req.body;
    if(!id || !Post.isValidObjectId(id)) {
        if(!sent) {
            res.status(404).send(`the id ${id} is not valid`);
            sent = true;
        }
    }
    let resDoc = {_id: id}
    await User.findOne({email: userEmail}, function(error, docs){
        if(error || !docs) {
            if(!sent){
                res.status(400).send("No user email with the email provided - " + userEmail);
                sent = true;
            }

        }
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
        if(error && !sent) {
            res.status(400).send("Error in post update: " + error);
            sent = true;
        }
        if(!sent)
            res.status(200).json(docs)
    });
}

const deletePost = async (req,res) => {
    let sent = false;
    const {id} = req.params;
    if(!Post.isValidObjectId(id)) {
        res.status(404).send(`the id ${id} is not valid`);
        sent = true;
    }
    await Post.findByIdAndUpdate(id,{isDeleted: true}, function(error, result){
        if(error && !sent) {
            res.status(400).send("Error while deleting post with ID " + id);
            sent = true;
        }
    });
    if(!sent)
        res.status(200).send("Post deleted successfully.");
}

module.exports = {readPosts, createPost, updatePost, deletePost,getPostById, readCommentsByPost};
