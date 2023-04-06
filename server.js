const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler  =require('./middleware/error')


// Load env vars
dotenv.config({path:'./config/config.env'})
// connect to database
connectDB();
// Route files
const books = require('./routes/books')
const rentedBooks = require('./routes/rentedBooks')
const auth = require('./routes/auth')
const app = express()

app.use(express.json())
app.use(logger)

// Mount Routers

app.use('/api/v1/books',books)
app.use('/api/v1/rentedBooks',rentedBooks)
app.use('/api/v1/auth',auth)
app.use(errorHandler)
const PORT = process.env.PORT || 7000

const server = app.listen(PORT, ()=>{
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})
// Handle unhabdled rejection
process.on('unhandledRejection',(err,promise)=>{
	console.log(`Error: ${err.message}`);
	// close server and exit process
	server.close(()=>process.exit(1))
})