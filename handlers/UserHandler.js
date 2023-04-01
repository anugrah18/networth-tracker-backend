const expressAsyncHandler = require("express-async-handler");
const responseWithStatus = require("../utils/responseTemplate");
const { User } = require("../models/ModelsDefine");

//Get all users.
const getAllUsersHandler = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "firstName", "lastName", "email", "isAdmin"],
      order: ["createdAt"],
    });

    return res.json(users);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Get an user.
const getUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: ["userId", "firstName", "lastName", "email", "isAdmin"],
    });
    if (user === null) {
      return responseWithStatus(
        res,
        `Not found any User with id : ${userId}`,
        404
      );
    }
    return res.json(user);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Create an user.
const createUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const emailPresentInDB = await User.findOne({
      where: { email: email },
      attributes: ["email"],
    });

    if (emailPresentInDB !== null) {
      return responseWithStatus(
        res,
        `User already exists with the email : ${email}`,
        409
      );
    }

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    return responseWithStatus(
      res,
      `User successfully created with id : ${user.userId}`
    );
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Delete an user.
const deleteUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    ID = req.params.id;
    const deletedUser = await User.destroy({
      where: {
        userId: ID,
      },
    });

    if (deletedUser === 0) {
      return responseWithStatus(
        res,
        `Not found any user to delete with id : ${ID}`,
        404
      );
    }

    return responseWithStatus(res, `Successfully deleted User with id : ${ID}`);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

module.exports = {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
};
