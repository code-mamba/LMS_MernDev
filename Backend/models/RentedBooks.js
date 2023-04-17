const mongoose = require('mongoose')
const RentedBooksSchema = new mongoose.Schema({
	title:{
		type: String,
		trim: true,
		required:[true, 'Please add a book title']
	},
	bookId:{
		type: mongoose.Schema.ObjectId,
		ref: 'Books',
		required: true
	},
	rentDays:{
		type: Number,
		required:[true, 'Please add a rentdays']
	},
	rentedDate:{
		type: Date,
		default: Date.now
	},
	returnDate:{
		type: Date,
		required:[true, 'Please add a return date']
	},
	userId:{
		type: String,
		required:[true, 'Please add user id']
	},
	rentExpired:{
		type:Boolean,
		default: false
	},
	userName:{
		type: String,
		required:[true, 'Please add a userName']
	},
	borrowedQuantity:{
		type: Number,
		requied:[true, 'please add borrow quantity']
	}
})
module.exports = mongoose.model('RentedBooks',RentedBooksSchema)