const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
} = require("../handlers/UserHandler");
const userRoute = express.Router();

userRoute.get("/", getAllUsersHandler);
userRoute.get("/:id", getUserHandler);
userRoute.post("/", createUserHandler);

module.exports = userRoute;
