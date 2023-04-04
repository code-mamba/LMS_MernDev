const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')



// Load env vars
dotenv.config({path:'./config/config.env'})
// connect to database
connectDB();
// Route files
const books = require('./routes/books')

const app = express()

app.use(express.json())
app.use(logger)

// Mount Routers

app.use('/api/v1/books',books)

const PORT = process.env.PORT || 7000

const server = app.listen(PORT, ()=>{
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
// Handle unhabdled rejection
process.on('unhandledRejection',(err,promise)=>{
	console.log(`Error: ${err.message}`);
	// close server and exit process
	server.close(()=>process.exit(1))
})