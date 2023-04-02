const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
} = require("../handlers/UserHandler");
const userRoute = express.Router();

userRoute.get("/", getAllUsersHandler);
userRoute.get("/:id", getUserHandler);
userRoute.post("/", createUserHandler);
userRoute.post("/login", loginUserHandler);
userRoute.delete("/:id", deleteUserHandler);
userRoute.put("/:id", updateUserHandler);

module.exports = userRoute;
