const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const RentedBooks = require('../models/RentedBooks')

// @desc   Get RentedBooks
// @Routes Get /api/v1/RentedBooks
// @access Public

exports.getRentedBooks = asyncHandler( async(req,res,next)=>{
	let query;
	if(req.params.bookId){
		query = RentedBooks.find({book: req.params.bookId})
	}
	else{
		query = RentedBooks.find()
	}
	const rentedBooks = await query
	res.status(200).json({success:true,count: rentedBooks.length,data:rentedBooks})
} )
exports.postRentedBooks = asyncHandler( async(req,res,next)=>{
	const rentedbook = await RentedBooks.create(req.body);
 	 res.status(201).json({
    success: true,
    data: rentedbook,
  });
})