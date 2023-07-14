const express = require("express");
const User = require("../Controller/User.controller");
const multer = require("multer");
const { guard } = require("../utils/middleware");
const path = require("path");
const Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/User");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
});

Router.post(
  "/register",
  upload.fields([{ name: "aadharCard" }, { name: "profilePhoto" }]),
  User.RegisterUser
);

Router.post("/sendotp", User.SendOtp);

Router.post("/login", User.Login);

module.exports = Router;
