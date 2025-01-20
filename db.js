const { mongoose } = require("mongoose");

//connection
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMongoDB };
