const expressAsyncHandler = require("express-async-handler");
const responseWithStatus = require("../utils/responseTemplate");
const { User } = require("../models/ModelsDefine");
const {
  generateHashPassword,
  passwordMatching,
} = require("../utils/Auth/passwordUtils");
const {
  generateResetPasswordToken,
  generateToken,
} = require("../utils/Auth/tokenUtils");
const { sendEmail } = require("../utils/Email/Mailgun");

//Get all users.
const getAllUsersHandler = expressAsyncHandler(async (req, res) => {
  try {
    //If user is not an admin.
    if (!req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

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

    //If user does not match logged in user or is not an admin.
    if (userId != req.user.userId && !req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

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

//Get user ID
const getUserIdHandler = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?.userId;
    return res.json({ userId: userId });
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
    //If user is not an admin.
    if (!req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }
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

    //If user does not match logged in user or is not an admin.
    if (ID != req.user.userId && !req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

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
        token: generateToken(userFound.userId),
      };
      return res.json(user);
    }

    return responseWithStatus(res, "Invalid credentials", 401);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Forgot Password Link
const forgotPasswordHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({
      where: { email: email },
      attributes: ["userId", "email"],
    });

    if (userFound !== null) {
      const resetPasswordToken = generateResetPasswordToken(userFound.userId);
      const webDomain =
        process.env.PROD_FRONTEND_DNS || "http://localhost:3000";
      const resetUrl = `${webDomain}/forgot-password/${resetPasswordToken}`;
      const msg = `<h3>Please click on the following link to reset your password : ${resetUrl} </h3>`;

      const emailStatus = await sendEmail(
        email,
        "Reset password (My Financial App)",
        msg
      );
      console.log(emailStatus);
      if (emailStatus) {
        return responseWithStatus(
          res,
          `Successfully sent email to ${email}`,
          200
        );
      }
      return responseWithStatus(
        res,
        `Could'nt send  password reset token to ${email}`,
        500
      );
    }

    return responseWithStatus(res, `${email} is not registered`, 404);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Reset Password
const resetPasswordHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { newPassword } = req.body;

    const hashedPassword = await generateHashPassword(newPassword);

    const updatedUser = await User.update(
      { password: hashedPassword },
      {
        where: {
          userId: req.user.userId,
        },
      }
    );

    if (updatedUser == 0) {
      return responseWithStatus(
        res,
        `Could not update password for User with email : ${req.user.email}`,
        404
      );
    }
    return responseWithStatus(
      res,
      `Successfully updated User with email : ${req.user.email}`
    );
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
  getUserIdHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
};
