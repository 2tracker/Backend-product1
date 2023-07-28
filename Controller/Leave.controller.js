const Leave = require("../Model/Leave");

exports.CreateLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    const savedleave = await leave.save();
    if (savedleave) {
      res.status(201).json({ MSG: "Leave Created", Data: savedleave });
    } else {
        res.status(404).json({ MSG: "Leave Not Created" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to create Leave", error });
  }
};

exports.getLeave = async (req, res) =>{
  try {
    const leave = await Leave.find({});
    if (leave) {
      res.status(200).json({ MSG: "Leave Finded", Data: leave });
    } else {
      res.status(404).json({ MSG: ":eave Not Finded" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

exports.getbyidLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    } else {
      res.status(200).json({ MSG: "Leave Finded", Data: leave });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error });
  }
};

exports.UpdateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) {
      return res.status(404).json({ message: " Leave not found" });
    } else {
      res.status(200).json({ MSG: "Task Update", Data: leave });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

exports.DeleteLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const leave = await Leave.findOne({ _id: id });
    if (!leave) {
      return res.status(404).json({ error: "Leave not found" });
    }
    await Leave.findByIdAndRemove(id);
    res.json({ message: "Leave deleted successfully" });
  } catch (error) {
    console.error("Error during tasks deletion:", error);
    res.status(500).json({ error: "Leave deletion failed" });
  }
};
