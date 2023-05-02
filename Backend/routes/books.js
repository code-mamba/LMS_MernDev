const express = require('express')
const { getBooks, createBook, getBook, updateBook, deleteBook} = require('../controllers/books')
const {protect, authorize} = require("../middleware/auth")
const router = express.Router()


router.route('/').get(getBooks).post(protect, createBook)
router.route('/:id').get(getBook).put(protect,updateBook).delete(protect,deleteBook)
module.exports = router