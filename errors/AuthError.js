const { StatusCodes } = require("http-status-codes");
const ApiError = require("./ApiError");

module.exports = class AuthError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
};
