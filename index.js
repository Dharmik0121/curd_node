const express = require("express");
const { connectToMongoDB } = require("./db");
const Person = require("./models/person");
const bodyParser = require("body-parser");
const Job = require("./models/job");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); // this middleware save json data in req.body

// const MongoUrl = process.env.MONGO_URL_LOCAL;

connectToMongoDB(process.env.MONGO_URL).then(() =>
  console.log("Database connected!")
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/job", jobRoutes);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} `));
