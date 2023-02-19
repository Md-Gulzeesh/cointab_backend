const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
//creating app
const app = express();
//Defining PORT
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);

// Home route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to the Cointab assignment database</h1>`);
});

//Starting Server and establishing connection with Database
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to database.", error);
  }
  console.log(`Server started on port ${PORT}.`);
});
