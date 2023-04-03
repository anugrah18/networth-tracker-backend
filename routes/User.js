const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
} = require("../handlers/UserHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const userRoute = express.Router();

userRoute.get("/", authMiddleware, getAllUsersHandler);
userRoute.get("/:id", authMiddleware, getUserHandler);
userRoute.post("/", createUserHandler);
userRoute.post("/login", loginUserHandler);
userRoute.delete("/:id", deleteUserHandler);
userRoute.put("/:id", updateUserHandler);

module.exports = userRoute;
