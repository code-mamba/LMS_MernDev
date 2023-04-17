const express = require('express')
const {register, login, getMe, getUsers, logout} = require('../controllers/auth')
const{protect} = require('../middleware/auth')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

router.get('/me',protect,getMe)
router.get('/users',protect,getUsers)
module.exports = router