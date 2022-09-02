const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
    try {
      let data = req.body;
      if (!data) {
        res.status(400).send({ msg: "body is empty.please enter keys" })
      }
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    }
  
    catch (error) {
      res.status(500).send({ error: error.message })
    }
  };

  const loginUser = async function (req, res) {
    try {
      let email = req.body.emailId;
      let password = req.body.password;
      if (req.body && email && password) {
        let user = await userModel.findOne({ emailId: email, password: password });
        if (!user) {
          return res.status(401).send({ status: false, msg: "Invalid email or password", });
        }
        let token = jwt.sign(
          {
            userId: user._id.toString(),
            month: "August",
            website: "Fackebook",
          },
          "This is a secret information",
        );
        res.status(200).send({ status: true, token: token })
      } else {
        res.status(400).send({ status: false, msg: 'Request must contain Email and Password' })
      }
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
    }
  }


  const getUserData = async function (req, res) {
    try {
      let userId = req.params.userId;
      let userDetails = await userModel.findById(userId);
      if (!userDetails)
        return res.status(404).send({ status: false, msg: "No such user exists" });
      res.status(200).send({ status: true, data: userDetails });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
    }
  }

  const updateUser = async function (req, res) {
    try {
      let userId = req.params.userId;
      let user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({status: false, msg: "No such user exists"});
      }
      let updateData = req.body;
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, updateData, { new: true });
      res.status(200).send({ status: "updatedUser", data: updatedUser });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
    }
  }

  const markUser = async function (req, res) {
    try {
      let userId = req.params.userId;
      let user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({status: false, msg: "No such user exists"});
      }
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true });
      res.status(200).send({ status: "true", data: updatedUser });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.markUser = markUser;