const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017/LmsMern_db')
const database = client.db('LmsMern_db')
const User = database.collection("users")
const Books = database.collection("books")
const RentedBooks = database.collection("rentedbooks")



async function connectToDatabase(){
	try{
		await client.connect();
		
		console.log('Connected to MongoDB'.cyan.bold)
		return database
	}catch(error){
		console.error('Error connecting to MongoDb:'.error)
	}
}
module.exports = {connectToDatabase, database, User, Books, RentedBooks}
// const mongoose = require('mongoose')

// const connectDB = async () =>{
// 	const conn = await mongoose.connect(process.env.MONGO_URI)
// 	console.log(`Mongodb connected: ${conn.connection.host}`.cyan.bold);
// }
// module.exports = connectDB