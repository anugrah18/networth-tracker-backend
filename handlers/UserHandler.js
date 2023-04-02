const expressAsyncHandler = require("express-async-handler");
const responseWithStatus = require("../utils/responseTemplate");
const { User } = require("../models/ModelsDefine");
const {
  generateHashPassword,
  passwordMatching,
} = require("../utils/Auth/passwordUtils");

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

    const hashedPassword = await generateHashPassword(password);

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
      password: hashedPassword,
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

//Update an user.
const updateUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    ID = req.params.id;
    const { firstName, lastName } = req.body;
    const updatedUser = await User.update(
      { firstName: firstName, lastName: lastName },
      {
        where: {
          userId: ID,
        },
      }
    );

    if (updatedUser == 0) {
      return responseWithStatus(
        res,
        `Not found any User to update with id : ${ID}`,
        404
      );
    }
    return responseWithStatus(res, `Successfully updated User with id : ${ID}`);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Login a user
const loginUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({
      where: { email: email },
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "email",
        "isAdmin",
        "password",
      ],
    });

    if (userFound && (await passwordMatching(password, userFound.password))) {
      const user = {
        userId: userFound.userId,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
      };
      return res.json(user);
    }

    return responseWithStatus(res, "Invalid credentials", 401);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

module.exports = {
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
};
