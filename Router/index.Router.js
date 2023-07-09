const express = require("express");
const Admin = require("./Admin.router");

const Router = express();

Router.use('/admin',Admin)

module.exports = Router;
