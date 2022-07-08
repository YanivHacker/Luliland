const express = require('express');
const conversationRouter = express.Router();

const ConversationController = require('../Controllers/conversationController')

conversationRouter.post("/",ConversationController.newConversation)
conversationRouter.get("/:userId",ConversationController.getConversation)

module.exports = {conversationRouter}