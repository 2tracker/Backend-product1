const express = require("express");
const Leave = require("../Controller/Leave.controller");

const { Adminguard, Userguard } = require("../utils/middleware");

const Router = express.Router();

Router.post("/create",Leave.CreateLeave);
Router.get("/all", Leave.getLeave);
Router.get("/:id", Leave.getbyidLeave);
Router.patch("/update/:id",Leave.UpdateLeave);
Router.delete("/delete/:id",Leave.DeleteLeave);

module.exports = Router;
