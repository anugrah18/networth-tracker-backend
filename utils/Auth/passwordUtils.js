const bcrypt = require("bcrypt");
const responseWithStatus = require("../responseTemplate");

const SALT_ROUNDS = 10;

const generateHashPassword = async (plainTextPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
};

const passwordMatching = async (plainTextPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = { generateHashPassword, passwordMatching };
