const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const verifyToken = async(req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ msg: "missing authHeaders/token" })
  }
  
  const token=authHeader.split(" ")[1];
  if(!token){
    return res.status(400).json({msg:"token missing"})
  }

  try {
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findOne({_id:decode.id})
    req.user=user;
    next();
  } catch (error) {
    console.log("error in verifyToken ",error.message);
    return res.status(400).json({msg:error.message})
  }
}

module.exports=verifyToken