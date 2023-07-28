const express = require("express");
const Admin = require("./Admin.router");
const User = require('./User.router')
const Task = require('./Task.Router')
const Leave = require('./Leave.router')

const Router = express();

Router.use('/admin',Admin)
Router.use('/user',User)
Router.use('/task',Task)
Router.use('/leave',Leave)


module.exports = Router;
