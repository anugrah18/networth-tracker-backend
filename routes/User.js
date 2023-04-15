const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
  getUserIdHandler,
} = require("../handlers/UserHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const userRoute = express.Router();

userRoute.get("/", authMiddleware, getAllUsersHandler);
userRoute.get("/:id", authMiddleware, getUserHandler);
userRoute.post("/", createUserHandler);
userRoute.post("/login", loginUserHandler);
userRoute.delete("/:id", authMiddleware, deleteUserHandler);
userRoute.put("/:id", authMiddleware, updateUserHandler);
userRoute.get("/user/id", authMiddleware, getUserIdHandler);

module.exports = userRoute;
