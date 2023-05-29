const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

/**
 * @desc Register new user
 * @route GET /api/users/
 * @access public
 */
const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Add all required fields");
  }

  // is user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists, change your email address or login");
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(500);
    throw new Error("Server Error! Unable to create new user. Try again later");
  }

  res.status(201).json({
    message: "success",
    data: {
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken({ id: user._id }),
    },
  });
});

/**
 * @desc authenticate user (login)
 * @route GET /api/users/login
 * @access public
 */
const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });
  const authenticate = user && (await bcrypt.compare(password, user.password));

  if (!authenticate) {
    res.status(500);
    throw new Error("Invalid credentials!");
  }

  res.status(201).json({
    message: "success",
    data: {
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

/**
 * @desc get currently authenticated user (login)
 * @route GET /api/users/me
 * @access private
 */
const getCurrentUser = AsyncHandler(async (req, res) => {
  const { _id, username, email } = req.user;

  res.status(200).json({
    status: "success",
    data: {
      _id,
      username,
      email,
    },
  });
});

/**
 * @desc generate JWT
 */
const generateToken = (id) => {
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign({ id }, process.env.JWT_SECRET, options);
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
