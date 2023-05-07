// const mongoose = require('mongoose')
const { MongoClient } = require("mongodb");
const BookSchema = {
  title: {
    type: String,
    required: [true, "please add a title"],
    unique: true,
    trim: true,
    maxlength: [350, "Name cannot be more than 350 characters"],
  },
  author: {
    type: String,
    required: [true, "please add author name"],
    trim: true,
    maxlength: [50, "Authorname cannot be more than 50 characters"],
  },
  categories: {
    type: String,
    required: [true, "please add category"],
    maxlength: [15, "category cannot be more than 15 characters"],
  },
  volume: {
    type: Number,
    required: [true, "please add volume"],
  },
  year: {
    type: Number,
    required: [true, "please add year"],
  },
  edition: {
    type: String,
    required: [true, "Please add edition"],
    maxlength: [12, "edition cannot be more than 12 characters"],
  },
  language: {
    type: String,
    required: [true, "please add language"],
    maxlength: [10, "language cannot be more than 10 charcters"],
  },
  pages: {
    type: Number,
    required: [true, "Please add pages"],
  },
  description: {
    type: String,
    required: [true, "please add description"],
    maxlength: [3000, "description cannot be more than 3000 characters"],
  },
  quantity: {
    type: Number,
    required: [true, "please add quantity"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
module.exports = BookSchema
// const BookSchema = new mongoose.Schema({

// 		title:{
// 			type: String,
// 			required: [true,'please add a title'],
// 			unique: true,
// 			trim: true,
// 			maxlength:[350,"Name cannot be more than 350 characters"]
// 		},
// 		author:{
// 			type: String,
// 			required: [true,'please add author name'],
// 			trim: true,
// 			maxlength: [50,"Authorname cannot be more than 50 characters"]
// 		},
// 		categories:{
// 			type: String,
// 			required: [true, 'please add category'],
// 			maxlength:[15,'category cannot be more than 15 characters']
// 		},
// 		volume:{
// 			type: Number,
// 			required: [true, "please add volume"]
// 		},
// 		year:{
// 			type: Number,
// 			required: [true,'please add year']
// 		},
// 		edition:{
// 			type: String,
// 			required: [true, 'Please add edition'],
// 			maxlength: [12, 'edition cannot be more than 12 characters']
// 		},
// 		language:{
// 			type: String,
// 			required: [true, 'please add language'],
// 			maxlength:[10,'language cannot be more than 10 charcters']
// 		},
// 		pages:{
// 			type: Number,
// 			required: [true, 'Please add pages']
// 		},
// 		description:{
// 			type: String,
// 			required: [true, 'please add description'],
// 			maxlength: [3000, 'description cannot be more than 3000 characters']
// 		},
// 		quantity:{
// 			type: Number,
// 			required: [true, 'please add quantity']
// 		},
// 		available:{
// 			type: Boolean,
// 			default: false
// 		},
// 		image:{
// 			type: String,
// 			default: 'no-photo.jpg'
// 		},
// 		createdAt:{
// 			type: Date,
// 			default: Date.now
// 		}
// })
// module.exports = mongoose.model("Books",BookSchema)
