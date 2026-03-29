
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{
  res.json({msg:"Signup working"});
};

exports.login = async (req,res)=>{
  const token = jwt.sign({id:1}, process.env.JWT_SECRET);
  res.json({token});
};
