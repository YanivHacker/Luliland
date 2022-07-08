const userController = require('../Controllers/userController')
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/',userController.readUsers);
usersRouter.get('/:id',userController.getUserById);
usersRouter.post('/',userController.createUser);
usersRouter.patch('/:id',userController.updateUser);
usersRouter.delete('/:id',userController.deleteUser);
usersRouter.post('/login', userController.logIn);
usersRouter.get('/:id/posts', userController.readPostsByUser);
usersRouter.get('/search', userController.searchUsers);
usersRouter.get('/mostactive', userController.getMostActiveUsers);

module.exports = usersRouter;