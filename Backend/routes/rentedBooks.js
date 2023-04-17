const express = require('express')
const {getRentedBooks, postRentedBooks, getSingleUserBook, deleteRentedBook} = require('../controllers/rentedBooks')
const {protect} = require("../middleware/auth")
const router = express.Router()


router.route('/').get(protect, getRentedBooks, getSingleUserBook).post(postRentedBooks)
router.route('/:id').delete(protect,deleteRentedBook)

module.exports = router