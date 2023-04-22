const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Books = require("../models/Books");
const path = require("path");

// @desc     Get all Books
// @route    GET/api/v1/books
// @access   public
exports.getBooks = asyncHandler(async (req, res, next) => {
  let query;
  // Created query string
  let queryStr = JSON.stringify(req.query);
  // Create operator like (gte,gte,lt..) etc
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Books.find(JSON.parse(queryStr)).sort({ title: 1 });

  // Executing query
  const books = await query;
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});
// @desc     Get single Book
// @route    GET/api/v1/books/:id
// @access   public
exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Books.findById(req.params.id);
  if (!book) {
    return next(
      new ErrorResponse(`Book Not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});
// @desc     create new Book
// @route    POST/api/v1/books
// @access   private
exports.createBook = asyncHandler(async (req, res, next) => {
  const book = await Books.create(req.body);
  res.status(201).json({
    success: true,
    data: book,
    message: "book added successfully",
  });
});
// @desc     Update Book
// @route    PUT/api/v1/books/:id
// @access   private
exports.updateBook = asyncHandler(async (req, res, next) => {
  console.log("reqParms", req.params.id, req.body);
  const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return next(
      new ErrorResponse(`Book Not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});
// @desc     delete Book
// @route    DELETE/api/v1/books/:id
// @access   private
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Books.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(
      new ErrorResponse(`Book Not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "Book Deleted Successfully",
  });
});
