const DmController = require('../Controllers/directMessageController');

const express = require('express');

const dmRouter = express.Router();

dmRouter.all('/',DmController.getAllDmMessage);
dmRouter.get('/',DmController.getChat);
dmRouter.post('/',DmController.sendDm);

module.exports = dmRouter;