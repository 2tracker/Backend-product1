const express = require("express");
const Admin = require("./Admin.router");
const User = require('./User.router')

const Router = express();

Router.use('/admin',Admin)
Router.use('/user',User)


module.exports = Router;
