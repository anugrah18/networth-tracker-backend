const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/ModelsDefine");
const responseWithStatus = require("../../utils/responseTemplate");

//Authorization middleware via jwt.
const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN_KEY);

        //find the user by ID
        const user = await User.findByPk(decoded.user.id, {
          attributes: ["userId", "firstName", "lastName", "email", "isAdmin"],
        });

        req.user = user;
        next();
      }
    } catch (error) {
      return responseWithStatus(
        res,
        "Not authorized or token expired, please login again.",
        401
      );
    }
  } else {
    return responseWithStatus(
      res,
      "There is no token attached to the header.",
      401
    );
  }
});

module.exports = authMiddleware;
