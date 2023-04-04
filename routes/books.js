const express = require('express')
const { getBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/books')

const router = express.Router()

router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook)

module.exports = router