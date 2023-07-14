const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadharCard: { type: Array, required: true },
  profilePhoto: { type: Array, required: true },
  salary: { type: Number, required: true },
  income: { type: Number, required: true },
  totalTraineePeriods: { type: String, required: true },
  incrementMonths: { type: String, required: true },
  incrementSalary: { type: String, required: true },
  otp:{ type:Number},
  otpExpiration: {type: Date,},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
