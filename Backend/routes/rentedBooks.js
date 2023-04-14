const express = require('express')
const {getRentedBooks, postRentedBooks} = require('../controllers/rentedBooks')
const {protect} = require("../middleware/auth")
const router = express.Router()

router.route('/').get(protect, getRentedBooks).post(postRentedBooks)

module.exports = router