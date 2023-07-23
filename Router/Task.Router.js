const express = require("express");
const Task = require("../Controller/Task.controller");

const { Adminguard, Userguard } = require("../utils/middleware");

const Router = express.Router();

Router.post("/create", Task.CreateTask);
Router.get("/all", Task.getTask);
Router.get("/:id", Task.getbyidTask);
Router.patch("/update/:id", Task.UpdateTask);
Router.delete("/delete/:id", Task.DeleteTask);

module.exports = Router;
