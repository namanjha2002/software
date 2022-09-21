const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const { isValidObjectId } = require("../validators/validator")


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

module.exports.getBooksWithReview = getBooksWithReview