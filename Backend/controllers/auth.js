const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");

// @desc  Register user
// @route POST/api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const {
    userName,
    userEmail,
    userPassword,
    userMobile,
    userAddress,
    isAdmin,
  } = req.body;

  // Create user
  const user = await User.create({
    userName,
    userEmail,
    userPassword,
    userMobile,
    userAddress,
    isAdmin,
  });
  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST/api/v1/auth/login
// @access    public
exports.login = asyncHandler(async (req, res, next) => {
  console.log("inside login");
  const { userEmail, userPassword } = req.body;

  // Validate email & password
  if (!userEmail || !userPassword) {
    return next(
      new ErrorResponse("Please provide an email and password!", 404)
    );
  }
  // Check for the user
  const user = await User.findOne({ userEmail }).select("+userPassword");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(userPassword);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});
// Get Token from model, create and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
// @desc Get current logged in user
// @route Post/api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
