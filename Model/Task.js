const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskImageUrl: { type: String },
  toAssignee: { type: String, required: true },
  fromAssignee: { type: String, required: true },
  version: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Inprogress", "QA", "Done"],
    default: "Pending",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
