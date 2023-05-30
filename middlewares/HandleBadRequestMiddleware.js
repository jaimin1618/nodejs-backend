const { validationResult } = require("express-validator");
const BadRequestError = require("../errors/BadRequestError");

const HandleBadRequest = (req, res, next) => {
  const { errors } = validationResult(req);
  const _ = errors.map((item) => {
    return {
      value: item.value,
      message: item.msg,
      parameter: item.path,
    };
  });

  if (errors.length > 0) throw new BadRequestError("Bad Request", 400, _);
  next();
};

module.exports = HandleBadRequest;
