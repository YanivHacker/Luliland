const mongoose = require('mongoose');
const Post = require('../Models/Post');

const readPosts = async (req,res) =>{
    try {
        const posts = await Post.find();
        if(res) {
            res.status(200).json(posts);
        }
        else return posts;
    } catch (err) {
        if(res) {
            res.status(404).json({error: err.message});
        }
    }
    return null;
}

const getPostById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id))
            return res.status(404).send(`the id ${id} is not valid`);
        const post = await Post.findOne({_id:id});
        res.status(200).json(post);

    }catch(err) {
        res.status(404).json({error: err.message});
    }
}

const validatePost = async (content, images) => {
    if((!content || content.length == 0) && (!images || images.length == 0)){
        alert('Cannot post an empty post, please enter images/content');
        res.status(400).json(post);
    }
}

const createPost = async (req,res) => {
    try {
        // validatePost(req.body.content, req.body.images)
        const post = new Post(req.body);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}
const updatePost = async (req,res) => {
    const {id} = req.params;
    const {userEmail, title, content, images, creationDate, isDeleted, allCommentIDs} = req.body;
    validatePost(content, images)
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const post = {_id:id, userEmail, title, content, images, creationDate, isDeleted, allCommentIDs};
    await Post.findByIdAndUpdate(id,req.body);
    res.json(post);
}

const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const post = await Post.findByIdAndUpdate(id,{isDeleted: true});
    res.json(post);
}

module.exports = {readPosts, createPost, updatePost, deletePost,getPostById};
