const PostController = require('../Controllers/postController')
const express = require('express');

const postsRouter = express.Router();

postsRouter.get('/',PostController.readPosts);
postsRouter.get('/:id',PostController.getPostById);
postsRouter.post('/',PostController.createPost);
postsRouter.post('/tags', PostController.getTagsFrequencies);
postsRouter.patch('/:id',PostController.updatePost);
postsRouter.delete('/:id',PostController.deletePost);
postsRouter.get(':postID/comments', PostController.readCommentsByPost);

module.exports = postsRouter;