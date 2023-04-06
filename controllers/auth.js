const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/Users')

// @desc  Register user
// @route POST/api/v1/auth/register
// @access Public

exports.register = asyncHandler( async(req,res,next)=>{
	const {userName, userEmail, userPassword, userMobile, userAddress, isAdmin} = req.body

// Create user
	const user = await User.create({
		userName,
		userEmail,
		userPassword,
		userMobile,
		userAddress,
		isAdmin
	})
// Create token
	const token = user.getSignedJwtToken()
	res.status(200).json({success:true, token})
} )

// @desc      Login user
// @route     POST/api/v1/auth/login
// @access    public
exports.login = asyncHandler(async(req,res,next)=>{
	const {userEmail, userPassword} = req.body

	// Validate email & password
	if(!userEmail||!userPassword){
		return next(new ErrorResponse('Please provide an email and password!',404))
	}
	// Check for the user
	const user = await User.findOne({userEmail}).select('+userPassword')

	if(!user){
		return next(new ErrorResponse('Invalid credentials',401))
	}
	// Check if password matches
	const isMatch = await user.matchPassword(userPassword)
	if(!isMatch){
		return next(new ErrorResponse('Invalid credentials',401))
	}
	// Create token
		const token = user.getSignedJwtToken()
		res.status(200).json({success:true, token})
})