const mongoose = require('mongoose');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { emailRegex } = require('../regex/emailRegex')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "all fields are required" })
  }

  const emailMatch = emailRegex.test(email);

  if (!emailMatch) {
    return res.status(401).json({ msg: "email format is wrong" })
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword })

    res.status(200).json({ msg: "user registered successfully" });

  } catch (error) {
    console.log("error at registerUser ", error.message)
    res.status(401).json({ msg: error.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "all fields required" })
  }
  if (!emailRegex.test(email)) {
    return res.status(401).json({ msg: "wrong email" })
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user not found" })
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({msg:"wrong password"})
    }

    res.status(200).json({
      msg:"user login successfully",
      user:{
      id:user._id,
      name:user.name,
      email:user.email,
      },
      token:generateToken(user)
    })

  } catch (error) {

  }
}

const getMe=async(req,res)=>{
  if(req.user){
    res.status(200).json(req.user)
  }
}

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30min"})
}


module.exports = { registerUser, loginUser,getMe };