const Task = require("../Model/Task");

exports.CreateTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    if (!savedTask) {
      res.status(404).json({ MSG: "Task Not Created" });
    } else {
      res.status(201).json({ MSG: "Task Created", Data: savedTask });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
};

exports.getTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (tasks) {
      res.status(200).json({ MSG: "Task Finded", Data: tasks });
    } else {
      res.status(404).json({ MSG: "Task Not Finded" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

exports.getbyidTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ MSG: "Task Finded", Data: task });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error });
  }
};

exports.UpdateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ MSG: "Task Update", Data: task });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

exports.DeleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await Task.findOne({ _id: id });
    if (!tasks) {
      return res.status(404).json({ error: "Task not found" });
    }
    await Task.findByIdAndRemove(id);
    res.json({ message: "tasks deleted successfully" });
  } catch (error) {
    console.error("Error during tasks deletion:", error);
    res.status(500).json({ error: "tasks deletion failed" });
  }
};
