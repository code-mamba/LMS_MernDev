const express = require('express')
const {getRentedBooks} = require('../controllers/rentedBooks')
const {protect} = require("../middleware/auth")
const router = express.Router()

router.route('/').get(protect, getRentedBooks)

module.exports = router