const mongoose = require("mongoose");
require("dotenv").config();
//creating connection
const connection = mongoose.connect(process.env.MONGODB_URL);

module.exports = { connection };
