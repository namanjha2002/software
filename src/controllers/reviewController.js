const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const moment = require('moment');
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const { isValid, regexIsbn, regexRating, regexName, isValidObjectId } = require("../validators/validator")

const updateReview = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId
        const data = req.body
        const { review, rating, reviewedBy } = data;


        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "userId not valid" })
        }
        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: " reviewId not valid" })
        }
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data to update review" })
        }


        if (review) {
            if (!isValid(review)) {
                return res.status(400).send({ status: false, msg: "please provide review in proper format" })
            }

        }

        if (reviewedBy) {

            if (!isValid(reviewedBy)) {
                return res.status(400).send({ status: false, msg: "please provide reviewedBy in proper format." })
            };
            if (!regexName.test(reviewedBy)) {
                return res.status(400).send({ status: false, msg: "reviewedBy is invalid" })
            };
        };


        if (rating) {

            if (!isValid(rating)) {
                return res.status(400).send({ status: false, msg: "please provide rating in proper format" })
            };
            if (!regexRating.test(rating)) {
                return res.status(400).send({ status: false, msg: "rating must be between 1 and 5" })
            };
        };


        const findBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) {
            return res.status(404).send({ status: false, msg: " book not found" })
        }
        const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!findReview) {
            return res.status(404).send({ status: false, msg: "reviw does not exist" })
        }
        if (findReview.bookId != bookId) {
            return res.status(404).send({ status: false, message: "Review not found for this book" })
        }

        const updateReviewDetails = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: data }, { new: true })
        return res.status(200).send({ status: true, message: "Successfully updated the review of the book.", data: updateReviewDetails })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.updateReview=updateReview