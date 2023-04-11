const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')

// Load env vars
dotenv.config({path:'./config/config.env'})

// Load models
const Book = require('./models/Books')
const RentedBooks = require('./models/RentedBooks')
// connect to database 

mongoose.connect(process.env.MONGO_URI)

const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`,'utf-8'))
const rentedBooks = JSON.parse(fs.readFileSync(`${__dirname}/_data/rentedBooks.json`,'utf-8'))
// import into db
const importData = async ()=>{
	try {
		await Book.create(books)
		await RentedBooks.create(rentedBooks)
		console.log('Data Imported...'.green.inverse)
		process.exit()
	} catch (err) {
		console.log(err);
	}
}
// Delete data
const deleteData = async () =>{
	try {
		await Book.deleteMany()
		await RentedBooks.deleteMany()
		console.log("Data Destroyed...".red.inverse)
		process.exit()
		
	} catch (err) {
		console.log(err);
	}
}

if(process.argv[2] == "-i"){
	importData()
}
else if(process.argv[2]=='-d'){
	deleteData()
}