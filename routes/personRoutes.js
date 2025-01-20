const express = require("express");
const Person = require("../models/person");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fatched");
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("data fatched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {}
});

module.exports = router;
