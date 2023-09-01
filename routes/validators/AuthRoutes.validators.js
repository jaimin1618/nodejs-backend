const { body } = require("express-validator");

const loginValidation = [
  body("username").notEmpty().withMessage("username is required."),
  body("email")
    .isEmail()
    .withMessage("Invalid valid Email address format")
    .trim()
    .toLowerCase(),
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be more than 8 characters long")
    .trim(),
];

const registerValidation = [];

module.exports = {
  loginValidation,
  registerValidation,
};
