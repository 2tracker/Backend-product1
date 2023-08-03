const express = require("express");
const Chat = require("../Controller/Chat.controller");

const { Adminguard, Userguard } = require("../utils/middleware");

const Router = express.Router();

Router.post("/conversation",Chat.ChatConversation);
Router.get("/conversations/:userId",Chat.ChatConversationGetUser);
Router.post("/message", Chat.MessageSend);
Router.get("/message/:conversationId",Chat.ChatMessageGetUser);
Router.delete("/users/:userId",Chat.FindUser);

module.exports = Router;