const express = require('express')
const {register, login, getMe, getUsers, logout, forgotPassword, resetPassword} = require('../controllers/users')
const{protect} = require('../middleware/auth')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me/:id',protect,getMe)
router.get('/users',protect,getUsers)
router.post('/forgotpassword',forgotPassword)
router.put('/resetpassword/:resettoken',resetPassword)
module.exports = router