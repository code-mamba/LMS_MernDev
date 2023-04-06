const express = require('express')
const {getRentedBooks} = require('../controllers/rentedBooks')
const router = express.Router()

router.route('/').get(getRentedBooks)

module.exports = router