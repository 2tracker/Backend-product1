const express = require("express");
const Chat = require("../Controller/Chat.controller");

const { Adminguard, Userguard } = require("../utils/middleware");

const Router = express.Router();

Router.post("/conversations",Chat.conversation);
Router.get("/:userId",Chat.Getconversation);
Router.post("/messages",Chat.Messages);
Router.get("/messages/:conversationId",Chat.GetMessages);


module.exports = Router;