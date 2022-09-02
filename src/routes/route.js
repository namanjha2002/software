const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../midleware.js/auth")

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId", auth.checkToken, userController.getUserData)

router.put("/users/:userId", auth.checkToken, userController.updateUser) 

router.delete("/users/:userId", auth.checkToken, userController.markUser) 

module.exports = router;