const PostController = require('../Controllers/postController')
const express = require('express');

const postsRouter = express.Router();

postsRouter.get('/',PostController.readPosts);
postsRouter.get('/:id',PostController.getPostById);
postsRouter.post('/',PostController.createPost);
postsRouter.patch('/:id',PostController.updatePost);
postsRouter.delete('/:id',PostController.deletePost);

module.exports = postsRouter;