const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  title:{type: String,required: true,},
  description: {type: String,required: true,},
  leaveDate: {type: Date,required: true,},
  endDate: {type: Date,required: true,},
  isHalfLeave: {type: Boolean,default: false,},
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
