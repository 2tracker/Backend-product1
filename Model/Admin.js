const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile_number: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  pan_card: {
    type: Array,
    required: true,
  },
  aadhar_card: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp:{
    type:Number
  },
  otpExpiration: {
    type: Date,
  },

});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
