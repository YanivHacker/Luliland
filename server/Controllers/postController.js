const mongoose = require('mongoose');
const Post = require('../Models/Post');
const User = require("../Models/User");
const {AddPostToUser, deletePostFromUser} = require("./userController");

const readPosts = async (req,res) =>{
    await Post.find({isDeleted: false}, function(err, docs) {
        if (!req || !res) {
            console.log("here")
            if(err)
                return null;
            return docs;
        }
        else if (err)
            res.status(400).json({message: err});
        else if(docs) {
            res.status(200).json(docs.reverse());
        }
        else return null;
    }).clone();
}

const readCommentsByPost = async (req,res) => {
    let sent = false;
    const {postID} = req.params

    await Comment.find({postID: postID, isDeleted: false}, function(error, docs){
        if(error || !docs)
            if(!sent) {
                res.status(400).send("No comments on this post or error occurred.");
                sent = true;
            }
        else {
            if(!sent)
                res.status(200).json(docs);
        }
    }).clone();
}

const getPostById = async (req,res) => {
    let sent = false;
    try{
        const {id} = req.params;

        await Post.findById(id, function(error, result){
            if(error){
                if(!sent) {
                    res.status(404).send("Post not found.");
                    sent = true;
                }
            }
            if(!sent) {
                res.status(200).json(result);
                sent = true;
            }
        }).clone();
    }catch(err) {
        if(!sent) {
            res.status(404).json({error: err.message});
            sent = true;
        }
    }
}
//
// userEmail: {type: String, require: true},
// content: {type: String, require: false},
// image: {type: [{type: String}], default: []},
// creationDate: {type: String, require: true, default: Date.now().toString()},
// isDeleted: {type: Boolean, require: true, default: false},
// allCommentIDs: {type: [{type: String}], default: []}

const createPost = async (req,res) => {
    let sent = false;
    try {
        // validatePost(req.body.content, req.body.image)
        const {userEmail, content, image} = req.body
        await User.findOne({email: userEmail, isDeleted: false}, function(error, docs){
            if(error || !docs) {
                res.status(400).send("No user with email " + userEmail + "exists.");
                sent = true;
            }
        }).clone();
        if(!content && !image && !sent) {
            res.status(400).send("No content nor image in this post.");
            sent = true;
        }
        const post = new Post({userEmail:userEmail, content:content, image:image});
        await post.save();
        await AddPostToUser({email: userEmail, postID: post.id});
        if(!sent)
            res.status(200).json(post);
    } catch (error) {
        if(!sent)
            res.status(404).json({ message:error });
    }
}

const deleteCommentFromPost = async (req) => {
    let succeeded = true;
    let allCommentIDs = null;
    await Post.findById(req.postID, async function (error, docs) {
        if (error || !docs) {
            succeeded = false;
        } else allCommentIDs = docs.allCommentIDs;

        if (!succeeded)
            return false;
        let toRemove = req.commentID;
        allCommentIDs = allCommentIDs.filter(e => e !== toRemove)
        await Post.findByIdAndUpdate(req.postID, {allCommentIDs: allCommentIDs}, {new: true}, function (error, docs) {
            if (error) succeeded = false;
            console.log("Posts after removal: " + docs.allCommentIDs);
        }).clone();
    }).clone();

    return succeeded;
}

const addCommentToPost = async (req) => {
    let succeeded = true;
    let allCommentsIDs = null;
    await Post.findById(req.postID, async function (error, docs) {
        if (error || !docs) {
            succeeded = false;
        }
        allCommentsIDs = docs.allCommentIDs;
        if(allCommentsIDs == null) allCommentsIDs = [];
        console.log(docs);
        if (!succeeded)
            return false;
        let newCommentId = req.commentID;
        allCommentsIDs.push(newCommentId);

        await Post.findByIdAndUpdate(req.postID, {allCommentsIDs: allCommentsIDs}, {new: true}, function (error, docs) {
            if (error) succeeded = false;
            console.log("Posts after addition: " + docs.allCommentsIDs);
        }).clone();
    }).clone();

    return succeeded;
}

const updatePost = async (req,res) => {
    let sent = false;
    const {id} = req.params;
    const {userEmail, content, image, allCommentIDs} = req.body;
    if(!id) {
        if(!sent) {
            res.status(404).send(`the id ${id} is not valid`);
            sent = true;
        }
    }
    let resDoc = {_id: id}
    await User.findOne({email: userEmail, isDeleted: false}, function(error, docs){
        if(error || !docs) {
            if(!sent){
                res.status(400).send("No user email with the email provided - " + userEmail);
                sent = true;
            }

        }
    }).clone();
    resDoc.userEmail = userEmail
    if(content)
        resDoc.content = content
    if(image)
        resDoc.image = image
    if(allCommentIDs)
        resDoc.allCommentIDs = allCommentIDs
    await Post.findByIdAndUpdate(id,resDoc, {new: true}, function(error, docs){
        if(error && !sent) {
            res.status(400).send("Error in post update: " + error);
            sent = true;
        }
        if(!sent)
            res.status(200).json(docs)
    }).clone();
}

const deletePost = async (req,res) => {
    let sent = false;
    const {id} = req.params;
    await Post.findByIdAndUpdate(id,{isDeleted: true}, async function(error, result){
        if(error && !sent) {
            res.status(400).send("Error while deleting post with ID " + id);
            sent = true;
        }
        if(result)
            await deletePostFromUser({email: result.userEmail, postID: result.id});
        if(!sent)
            res.status(200).send("Post deleted successfully.");    }).clone();
}

module.exports = {readPosts, createPost, updatePost, deletePost,getPostById, readCommentsByPost, addCommentToPost, deleteCommentFromPost};
