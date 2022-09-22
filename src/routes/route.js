const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const middleware = require('../middlewares/auth')

router.get('/test', function(req, res){
    return res.send({status: true, msg: "running"})
})

router.post('/register', userController.createUser)

router.post("/login", userController.loginUser)

router.post("/books", middleware.authentication, bookController.createBook)

router.get("/books/:bookId", bookController.getBooksWithReview)


// Review API

router.post("/books/:bookId/review", reviewController.createReview)












module.exports = router