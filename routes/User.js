const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
} = require("../handlers/UserHandler");
const userRoute = express.Router();

userRoute.get("/", getAllUsersHandler);
userRoute.get("/:id", getUserHandler);
userRoute.post("/", createUserHandler);
userRoute.delete("/:id", deleteUserHandler);
userRoute.put("/:id", updateUserHandler);

module.exports = userRoute;
