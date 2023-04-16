const express = require("express");
const {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
  getUserIdHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} = require("../handlers/UserHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const userRoute = express.Router();

userRoute.get("/", authMiddleware, getAllUsersHandler);
userRoute.post("/password/forgot", forgotPasswordHandler);
userRoute.post("/password/reset", authMiddleware, resetPasswordHandler);
userRoute.get("/:id", authMiddleware, getUserHandler);
userRoute.post("/", createUserHandler);
userRoute.post("/login", loginUserHandler);
userRoute.delete("/:id", authMiddleware, deleteUserHandler);
userRoute.put("/:id", authMiddleware, updateUserHandler);
userRoute.get("/user/id", authMiddleware, getUserIdHandler);

module.exports = userRoute;
