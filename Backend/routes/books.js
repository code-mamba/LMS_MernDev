const express = require('express')
const { getBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/books')
const {protect, authorize} = require("../middleware/auth")

const router = express.Router()

router.route('/').get(getBooks).post(protect,authorize(true), createBook)
router.route('/:id').get(getBook).put(protect,authorize(true), updateBook).delete(protect,authorize(true), deleteBook)

module.exports = router