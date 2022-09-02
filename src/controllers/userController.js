const jwt = require('jsonwebtoken')
const userModel= require("../models/userModel")

const createUser=async function(req,res){
    let data = req.body
    let savedData = await userModel.create(data)
    res.send({msg:savedData})
}
const loginUser= async function(req,res){
    let userName = req.body.emailId
    let password = req.body.password
    let user = await userModel.findOne({emailId:userName,password:password})
    if (!user) return res.send ({ status:false,msg:"username or the password is not correct"})

    let payload = {_userId: user._id.tostring}
    let token = jwt.sign(payload,'namana')
    res.send({status:true,data:token})
} 
// let user = await userModel.findOne({emailId:userName,password:password})
const getUserData = async function (req, res) {
    let token =req.headers["x-auth-token"]
    console.log(token) 
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
    res.send({ status: true, data: userDetails });
  };
  const updateUser = async function (req, res) {
    let userData = req.body;
    let userId = req.params.userId;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: updatedUser, data: updatedUser });
  };
  const markUser = async function (req, res) {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.send("No such user exists");
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set: {isDeleted: true}}, {new:true});
    res.send({ status: "true", data: updatedUser });
  };
  


module.exports.createUser=createUser
module.exports.loginUser=loginUser
module.exports.getUserData=getUserData
module.exports.updateUser=updateUser
module.exports.markUser=markUser