const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UsersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please add a username"],
    maxlength: [25, "User name cannot be more than 25 character"],
    trim: true,
  },
  userEmail: {
    type: String,
    required: [true, "Please add a email"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  userPassword: {
    type: String,
    required: [true, "Please add a password"],
    match:[/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Please add a valid password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  userMobile: {
    type: String,
    minlength: 9,
    maxlength: 10,
  },
  userAddress: {
    type: String,
    required: true,
    trim: true
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});
// Encrypt password using bcrypt
UsersSchema.pre('save',async function (next){
  const salt = await bcrypt.genSalt(10)
  this.userPassword = await bcrypt.hash(this.userPassword,salt)
})
// Sign JWT and return
UsersSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Match user entered password to hashed password in database
UsersSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.userPassword)
}


module.exports = mongoose.model('User',UsersSchema)