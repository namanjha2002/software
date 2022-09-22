const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const moment = require('moment');
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const { isValid, regexIsbn, regexRating, regexName, isValidObjectId } = require("../validators/validator")

const createReview = async function (req, res) {
    try {
        let data = req.body
        let { bookId, reviewedBy, reviewedAt, rating, isDeleted } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data to create review" })
        }

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "please provide bookId" })
        }
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "please provide  valid bookId" })
        }
        let checkBook = await bookModel.findById(bookId)
        if (!checkBook) return res.status(404).send({ status: false, msg: "bookId not found" })
        if (checkBook.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "book is already deleted" })
        }

        if (!isValid(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "please provide reviewer details" })
        }

        if (!reviewedAt) {
            return res.status(400).send({ status: false, msg: "please provide the date of review" })
        }
        if (reviewedAt) {
            moment().format("YYYY-MM-DD")
        }

        if (!rating) {
            return res.status(400).send({ status: false, msg: "rating is only in number" })
        }

        if (!regexRating.test(rating)) {
            return res.status(400).send({ status: false, msg: "please rating between 1 - 5" })
        }

        if (isDeleted == true) {
            return res.status(400).send({ status: false, msg: "you are deleting your data on the time of creation" })
        }

        const reviewCreate = await reviewModel.create(data)
        return res.status(201).send({ status: false, msg: "review is successfully done", data: reviewCreate })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

// -------------------------------------------------------------------------------------------------------------------------------------------------- 

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



module.exports = { createReview, updateReview }
