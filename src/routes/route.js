const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController =require("../controllers/publisherController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//bookroutes
router.post("/createBook",bookController.createBook)
//author routes
router.post("/createAuthor",authorController.createAuthor)
//publisher.routes
router.post("/createPulisher",publisherController.createPublisher)
module.exports = router;