const CommentController = require('../Controllers/commentController')
const express = require('express');

const commentsRouter = express.Router();

commentsRouter.get('/',CommentController.readComments);
commentsRouter.get('/:id',CommentController.getCommentById);
commentsRouter.post('/',CommentController.createComment);
commentsRouter.patch('/:id',CommentController.updateComment);
commentsRouter.delete('/:id',CommentController.deleteComment);

module.exports = commentsRouter;