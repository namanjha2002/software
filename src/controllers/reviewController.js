const mongoose = require('mongoose')
const moment = require('moment');
const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/bookModel')
const {isValid, isValidObjectId, regexRating} = require('../validators/validator')

const createReview = async function(req, res){
    try {
        let data = req.body
    let { bookId, reviewedBy, reviewedAt, rating, isDeleted} = data

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
    if(checkBook.isDeleted == true){
        return res.status(404).send({status: false, msg: "book is already deleted"})
    }
    
    if (!isValid(reviewedBy)) {
        return res.status(400).send({ status: false, msg: "please provide reviewer details" })
    }

    if(!reviewedAt){
        return res.status(400).send({status: false, msg: "please provide the date of review"})
    }
    if (reviewedAt) {
        moment().format("YYYY-MM-DD")
    }

    if(!rating){
        return res.status(400).send({status: false, msg: "rating is only in number"})
    }

    if (!regexRating.test(rating)) {
        return res.status(400).send({ status: false, msg: "please rating between 1 - 5" })
    }

    if(isDeleted == true){
        return res.status(400).send({status: false, msg: "you are deleting your data on the time of creation"})
    }

    const reviewCreate = await reviewModel.create(data)
    return res.status(201).send({status: false, msg: "review is successfully done", data: reviewCreate})

    } catch (error) {
        return res.status(500).send({status: false, msg: error.message})
    }
    
}



module.exports = { createReview}