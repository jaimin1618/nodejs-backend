const { validationResult } = require("express-validator");
const BadRequestError = require("../errors/BadRequestError");

const HandleBadRequest = (req, res, next) => {
  const { errors } = validationResult(req);
  const requestErrors = errors.map((item) => {
    return {
      value: item.value,
      message: item.msg,
      parameter: item.path,
    };
  });

  if (errors.length > 0)
    throw new BadRequestError("Bad Request", requestErrors);
  next();
};

module.exports = HandleBadRequest;
