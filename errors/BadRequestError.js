const { StatusCodes } = require("http-status-codes");
const ApiError = require("./ApiError");

module.exports = class BadRequestError extends ApiError {
  constructor(message, requestErrors) {
    super(message);
    this.errors = requestErrors;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
};
