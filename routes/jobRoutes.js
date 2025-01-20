const express = require("express");
const Job = require("../models/job");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newJob = new Job(data);
    const response = await newJob.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Job.find();
    console.log("data fatched");
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Job.findByIdAndDelete(id);
    console.log("data deleted");
    res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await Job.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    // if user not found by id
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
