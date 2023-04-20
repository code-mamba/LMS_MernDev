const express = require('express')
const dotenv = require('dotenv')
// const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler  =require('./middleware/error')
const path = require('path')
const multer = require('multer')
// const morgan = require('morgan')
const bunyan = require('bunyan')

// Load env vars
dotenv.config({path:'./config/config.env'})
// connect to database
connectDB();
// Route files
const books = require('./routes/books')
const rentedBooks = require('./routes/rentedBooks')
const auth = require('./routes/users')
const logger = bunyan.createLogger({name: 'myapp'})
const app = express()

const cors = require("cors")
var corsOptions = {
	credentials:true,
	origin:true
}
app.use(cors(corsOptions))
app.options("*",cors(corsOptions))
app.use(express.json())

// Morgan

// app.use(morgan('combined'))
// Cookie parser
app.use(cookieParser())

// File Uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname,'public')))
app.use((req, res, next) => {
	logger.info({ req: req.url }, 'Incoming request');
	next();
  });
// Mount Routers

app.use('/api/v1/books',books)
app.use('/api/v1/rentedBooks',rentedBooks)
app.use('/api/v1/auth',auth)
app.use(errorHandler)
app.use((req,res,next)=>{
	logger.child({req:req},'Incoming request')
})

const PORT = process.env.PORT || 7000

const server = app.listen(PORT, ()=>{
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})


// Handle unhandled rejection
process.on('unhandledRejection',(err,promise)=>{
	console.log(`Error: ${err.message}`);
	// close server and exit process
	server.close(()=>process.exit(1))
})