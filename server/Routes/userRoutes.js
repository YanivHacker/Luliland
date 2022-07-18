const userController = require('../Controllers/userController')
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/addresses', userController.getAllUserAddresses);
usersRouter.get('/',userController.readUsers);
usersRouter.get('/:email',userController.getUserByEmail);
usersRouter.post('/',userController.createUser);
usersRouter.patch('/:email',userController.updateUser);
usersRouter.delete('/:email',userController.deleteUser);
usersRouter.post('/login', userController.logIn);
usersRouter.get('/:userEmail/posts', userController.readPostsByUser);
usersRouter.get('/search', userController.searchUsers);
usersRouter.get('/mostactive', userController.getMostActiveUsers);
usersRouter.post('/:email/addFriend', userController.addUserFriend);
usersRouter.get('/:email/friends', userController.getFriendsByUser);
usersRouter.get('/popularFirstNames', userController.getPopularFirstNames);
usersRouter.get('/popularLastNames', userController.getPopularLastNames);

module.exports = usersRouter;