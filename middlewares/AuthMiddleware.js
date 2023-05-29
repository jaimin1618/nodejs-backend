const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const AuthError = require("../errors/AuthError");

const Auth = AsyncHandler(async (request, response, next) => {
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract token
      token = request.headers.authorization.split(" ")[1];

      // verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      request.user = await User.findById(decode.id).select("-password");
      // removing password from User object after found

      next();
    } catch (e) {
      if (process.env.ENVIRONMENT === "development") {
        console.log(e);
      }
      throw new AuthError("User Not Authorized");
    }
  }

  if (!token) {
    throw new AuthError("User Not Authorized, JWT Token not found");
  }
});

module.exports = Auth;
