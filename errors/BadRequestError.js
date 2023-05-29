const { StatusCodes } = require("http-status-codes");
const ApiError = require("./ApiError");

module.exports = class BadRequestError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
};
