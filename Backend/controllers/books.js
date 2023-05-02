const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { Books } = require("../config/db");
const path = require("path");
const ObjectID = require("bson").ObjectId;

// @desc     Get all Books
// @route    GET/api/v1/books
// @access   public
exports.getBooks = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  console.log(queryStr)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = JSON.parse(queryStr);
  const books = await Books.find(query).sort({ title: 1 }).toArray();
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
  const o_id = new ObjectID(req.params.id);
  const book = await Books.findOne({ _id: o_id });
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
  const book = await Books.insertOne(req.body);
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
  const filter = { _id: new ObjectID(req.params.id) };
  const update = { $set: { ...req.body } };
  delete update.$set._id
  const book = await Books.findOneAndUpdate(filter, update, {
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
  const o_id = new ObjectID(req.params.id);
  const book = await Books.findOneAndDelete({ _id: o_id });
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
