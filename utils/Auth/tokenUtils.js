const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_TOKEN_KEY, { expiresIn: "30d" });
};

const generateResetPasswordToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_KEY, { expiresIn: "3d" });
};

module.exports = { generateToken, generateResetPasswordToken };
