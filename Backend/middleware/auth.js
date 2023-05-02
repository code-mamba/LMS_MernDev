const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/Users");
// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("req cookie",req.cookies)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
    console.log(token)
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.user = User.findById(userId);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});
// Grant access to specific role
exports.authorize = (...isAdmin) => {
  return (req, res, next) => {
    if (!isAdmin.includes(req.user.isAdmin)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.isAdmin} is not authorized to acccess this role`,
          403
        )
      );
    }
    next();
  };
};
