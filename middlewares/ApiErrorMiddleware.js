const ApiError = require("../errors/ApiError");
const BadRequestError = require("../errors/BadRequestError");
const { StatusCodes } = require("http-status-codes");

const HandleApiError = (error, req, res, next) => {
  if (error instanceof BadRequestError)
    return res.status(error.statusCode).json({
      message: error.message,
    });

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "Something went wrong, Internal Server Error",
    message: error.message,
    stack: process.env.ENVIRONMENT === "development" ? error.stack : null,
  });
};

module.exports = HandleApiError;
