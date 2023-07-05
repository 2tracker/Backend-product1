const express = require("express");
const Admin = require("../Controller/Admin.controller");
const multer = require("multer");
const path = require('path')
const Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Admin");
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
  upload.fields([{ name: "pan_card" }, { name: "aadhar_card" }]),
  Admin.Register
);
Router.post(
  "/sendotp",
  Admin.SendOtp
);

module.exports = Router;
