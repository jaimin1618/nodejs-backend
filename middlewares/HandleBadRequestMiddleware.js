const { validationResult } = require("express-validator");
const ApiResponse = require("../controllers/response/ApiResponse");
const ApiError = require("../controllers/error/ApiError");

const HandleBadRequest = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const error = errors.shift();
    throw new ApiError(error.msg, 400, null);
  }

  next();
};

module.exports = HandleBadRequest;
