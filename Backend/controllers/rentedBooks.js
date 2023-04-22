const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const RentedBooks = require("../models/RentedBooks");

// @desc   Get RentedBooks
// @Routes Get /api/v1/RentedBooks
// @access Public

exports.getRentedBooks = asyncHandler(async (req, res, next) => {
  let query;
  if (req.query) {
    console.log(req.query);
    query = RentedBooks.find(req.query);
  } else {
    query = RentedBooks.find();
  }
  const rentedBooks = await query;
  res
    .status(200)
    .json({ success: true, count: rentedBooks.length, data: rentedBooks });
});
exports.postRentedBooks = asyncHandler(async (req, res, next) => {
	let Title = req.body.bookTitle
  console.log("backend", typeof(Title));
  const rentedbook = await RentedBooks.create(req.body);
  res.status(201).json({
    success: true,
    data: rentedbook,
    message: "rented successfully"
  });
});
exports.getSingleUserBook = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const rentedbook = await RentedBooks.find(req.query);
  if (!rentedbook) {
    return next(
      new ErrorResponse(`Books Not found with id of ${req.params.userId}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});

//   Delete  RentedBook by id
exports.deleteRentedBook = asyncHandler(async (req, res, next) => {
  const rentedbook = await RentedBooks.findByIdAndDelete(req.params.id);
  if (!rentedbook) {
    return next(
      new ErrorResponse(`Book Not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
