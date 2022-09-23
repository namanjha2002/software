const mongoose = require('mongoose')
const moment = require('moment');
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const { isValid, regexIsbn, regexRating, isValidObjectId } = require("../validators/validator")

// -----------------------------------------------------------------------------------------------------------------------
const createBook = async function (req, res) {
    try {
        let data = req.body;
        let { title, excerpt, ISBN, category, reviews, subcategory, releasedAt, userId, isDeleted } = data;

        let decodedId = req.token.userId
        console.log(decodedId)
        if (decodedId !== userId) {
            return res.status(403).send({ status: false, msg: "unauthorised access" })
        }


        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data to create user" })
        }
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, msg: "please provide userId" })
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "please provide  valid userId" })
        }
        let checkUser = await userModel.findById(userId)
        if (!checkUser) return res.status(404).send({ status: false, msg: "userId not found" })
        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "please provide a title" })
        }
        let checkTitle = await bookModel.findOne({ title })
        if (checkTitle) return res.status(400).send({ status: false, message: "book with same title is already present...!" })

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: "please provide a excerpt" })
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: "please provide a ISBN" })
        }
        if (!regexIsbn.test(ISBN)) {
            return res.status(400).send({ status: false, msg: "please provide Valid ISBN" })
        }
        let checkISBN = await bookModel.findOne({ ISBN })
        if (checkISBN) return res.status(400).send({ status: false, message: "book with same ISBN is already present...!" })

        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "please provide category" })
        }
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "please provide subcategory" })
        }
        
        
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, msg: "please provide releasedAt in proper format" })
        }
        if (releasedAt) {
            moment().format("YYYY-MM-DD")
        }

        let bookdata = { title, excerpt, ISBN, category, reviews, subcategory, releasedAt, userId, isDeleted }

        let saveBook = await bookModel.create(bookdata);
        return res.status(201).send({ status: true, msg: "book created successfully", data: saveBook })
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
// --------------------------------------------------------------------------------------------------------------------
const getBooks = async function (req, res) {
    try {
        let data = req.query
        let userId = data.userId
        if (userId) {
            if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId not valid" })
            const getuser= await userModel.findById(userId)
            if(!getuser){
               return res.status(404).send({status: false, msg: "user not found"})
            }           }
         

        const getallbooks = await bookModel.find({ ...data, isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
    

        if (!getallbooks) {
            return res.status(404).send({ status: false, msg: "books not found" })
        }
        return res.status(200).send({ status: true, data: getallbooks, mgs: "all books are fetch successfully" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
// -------------------------------------------------------------------------------------------------------------------
const getBooksWithReview = async function (req, res) {
    try {
        let obj = {}
        let bookId = req.params.bookId
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Please Enter correct Book Id" })

        const getBook = await bookModel.findOne({ _id: bookId })
        if (!getBook) {
            return res.status(404).send({ status: false, message: "Book Not Found" })
        }
        obj._id = getBook._id
        obj.title = getBook.title
        obj.excerpt = getBook.excerpt
        obj.userId = getBook.userId
        obj.category = getBook.category
        obj.subcategory = getBook.subcategory
        obj.isDeleted = getBook.isDeleted
        obj.reviews = getBook.reviews
        obj.releasedAt = getBook.releasedAt
        obj.createdAt = getBook.createdAt
        obj.updatedAt = getBook.updatedAt

        console.log(getBook._id)

        const getReviewData = await reviewModel.find({ bookId: getBook._id })
        obj.reviewsData = getReviewData

        return res.status(200).send({ status: true, message: "Books List", data: obj })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
// ---------------------------------------------------------------------------------------------------------------------------------
const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Please Enter correct Book Id" })

        const bookIdExist = await bookModel.findOne({ _id: bookId })
        if (!bookIdExist) return res.status(404).send({ status: false, message: "Book Not Found" })

        if (bookIdExist.isDeleted == true) return res.status(404).send({ status: false, message: "Book Not Found" })

        let bodyData = req.body
        let { title, excerpt, releasedAt, ISBN } = bodyData
        if (Object.keys(bodyData).length == 0) return res.status(400).send({ status: false, message: "Please Enter Required Data" })

        let filter = {}

        if (title) {
            if (!isValid(title)) return res.status(400).send({ status: false, message: "please provide a title" })

            let checkTitle = await bookModel.findOne({ title })
            if (checkTitle) return res.status(400).send({ status: false, message: "book with same title is already present...!" })
            filter.title = title
        }

        if (excerpt) {
            if (!isValid(excerpt)) return res.status(400).send({ status: false, message: "please provide a excerpt" })
            filter.excerpt = excerpt
        }

        if (releasedAt) {
            if (!isValid(releasedAt)) return res.status(400).send({ status: false, message: "please provide releasedAt in proper format" })
            moment().format("YYYY-MM-DD")
            filter.releasedAt = releasedAt
        }

        if (ISBN) {
            if (!regexIsbn.test(ISBN)) return res.status(400).send({ status: false, msg: "please provide Valid ISBN" })

            let checkISBN = await bookModel.findOne({ ISBN })
            if (checkISBN) return res.status(400).send({ status: false, message: "book with same ISBN is already present...!" })
            filter.ISBN = ISBN
        }

        const update = await bookModel.findOneAndUpdate(
            { _id: bookId },
            { $set: { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN } },
            { new: true })

        return res.status(200).send({ status: true, message: "Update Book Successfully", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
// -------------------------------------------------------------------------------------------------------------------------------------

const deleteBookByParam = async function (req, res) {
    try {
        let bookIds = req.params.bookId
        //Db call
        let checkBook = await bookModel.findById({ _id: bookIds })
        if (!checkBook) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }
        if (checkBook.isDeleted === true) {
            return res.status(400).send({ status: false, message: "Book  already deleted" })
        }
        
        let deletebook = await bookModel.findOneAndUpdate({ _id: bookIds }, { $set: { isDeleted: true, deletedAt: new Date() } })
        
        return res.status(200).send({ status: true, message: "deleted successfully" })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports={createBook ,getBooksWithReview, getBooks, updateBook,deleteBookByParam}