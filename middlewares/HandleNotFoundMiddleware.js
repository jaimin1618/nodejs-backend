const { StatusCodes } = require("http-status-codes");

const HandleNotFound = (req, res) => {
  const { method, path } = req;

  res.status(StatusCodes.NOT_FOUND).json({
    route: `${method} ${path}`,
    message: "This route does not exist for API",
  });
};

module.exports = HandleNotFound;
