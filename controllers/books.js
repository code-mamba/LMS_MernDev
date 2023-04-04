const Books = require('../models/Books');


// @desc     Get all Books
// @route    GET/api/v1/books
// @access   public
exports.getBooks = async (req, res, next) => {
	try {
		const books = await Books.find();
		res.status(200).json({
			success:true,
			count:books.length,
			data: books
		})
	} catch (err) {
		res.status(400).json({success:false})
	}
};
// @desc     Get single Book
// @route    GET/api/v1/books/:id
// @access   public
exports.getBook = async (req, res, next) => {
	
	try {
		const book = await Books.findById(req.params.id)
		if(!book){
			return res.status(400).json({
				success:false
			})
		}
		res.status(200).json({
			success:true,
			data: book
		})
	} catch (err) {
		res.status(400).json({success:false})
	}
  };
// @desc     create new Book
// @route    POST/api/v1/books
// @access   private
exports.createBook = async (req, res, next) => {
	try{
		const book =  await Books.create(req.body)
		res.status(201).json({
			success: true,
			data: book
		})

	}catch(err){
		res.status(400).json({success:false})
	}

};
// @desc     Update Book
// @route    PUT/api/v1/books/:id
// @access   private
exports.updateBook = async(req, res, next) => {
	try {
		const book = await Books.findByIdAndUpdate(req.params.id,req.body,{
			new: true,
			runValidators: true
		})
		if(!book){
			return res.status(400).json({success:false})
		}
			res.status(200).json({
			success: true,
			data: book
		})
		
	} catch (err) {
		res.status(400).json({success:false})
	}
	
};
// @desc     delete Book
// @route    DELETE/api/v1/books/:id
// @access   private
exports.deleteBook = async(req, res, next) => {
	try {
		const book = await Books.findByIdAndDelete(req.params.id);
		if(!book){
			return res.status(400).json({success:false})
		}
		
			res.status(200).json({
				success:true,
				data: {}
			})
		
		
	} catch (err) {
		res.status(400).json({success:false})
		
	}

};