const { StatusCodes } = require("http-status-codes");
const ApiError = require("../controllers/error/ApiError");

const HandleNotFound = (req, res) => {
  const { method, path } = req;
  throw new ApiError(
    `${method} ${path} endpoint Not Found!`,
    StatusCodes.NOT_FOUND
  );
};

module.exports = HandleNotFound;
