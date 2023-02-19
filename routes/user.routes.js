const express = require("express");
const {
  addUsers,
  deleteUsers,
  getUsers,
} = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let response =  await getUsers(req.query);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRouter.post("/add", async (req, res) => {
  try {
    let response = await addUsers();
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRouter.delete("/delete", async (req, res) => {
  try {
    let response = await deleteUsers();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { userRouter };
