const userController = require('../Controllers/userController')
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/',userController.readUsers);
usersRouter.post('/',userController.createUser);
usersRouter.patch('/',userController.updateUser);
usersRouter.delete('/',userController.deleteUser);

module.exports = usersRouter;