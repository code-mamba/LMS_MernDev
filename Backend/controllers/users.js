const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ObjectID  = require("bson").ObjectId;
const { User } = require("../config/db");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

  // Hash Password
  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log(hashedPassword);
  // Create user
  console.log(User);
  const user = await User.insertOne({
    userName,
    userEmail,
    userPassword: hashedPassword,
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
  const { userEmail, userPassword } = req.body;

  // Validate email & password
  if (!userEmail || !userPassword) {
    return next(
      new ErrorResponse("Please provide an email and password!", 404)
    );
  }
  // Check for the user
  const user = await User.findOne({ userEmail });

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(userPassword, user.userPassword);
  // const isMatch = await user.matchPassword(userPassword);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc Get current logged in user
// @route Post/api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const o_id = new ObjectID(req.params.id);
  const user = await User.findOne({ _id: o_id });
  console.log("user Details", user);
  res.status(200).json({
    success: true,
    data: user,
  });
});
// @desc    Forgot password
// @route    POST/api/v1/auth/forgotpassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ userEmail: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}//api/v1/auth/resetpassword/${resetToken}`;
  const message = `You are receiving this email because of you (or someone else ) has
   requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
  try {
    await sendEmail({
      email: user.userEmail,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined);

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
// @desc  Reset password
// @route PUT/api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }
  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc   Log user out/ clear cookie
// @route  POST/api/v1/auth/logout
// @access Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
    message: "Logged out successfully",
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  // console.log(req.query)
  let query;
  if (req.query) {
    console.log(req.query);
    query = User.find(req.query).toArray();
    console.log(req.query);
  } else {
    query = User.find();
  }
  const users = await query;
  res.status(200).json({ success: true, count: users.length, data: users });
});
// Get Token from model, and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  console.log("Token", token);
  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, message: "successfully Logged in" });
};
