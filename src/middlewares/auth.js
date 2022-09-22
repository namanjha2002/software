const jwt = require('jsonwebtoken')
const bookModel = require('../models/bookModel')


const authentication = async function(req, res, next){
    try {
        let token = req.header("x-api-key")
        if(!token){
            return res.status(404).send({status:false, msg: "Token must be present"})
        }

        let decodedToken = jwt.verify(token, "Project3-Group63-BookManagement")
        if(!decodedToken){
            return res.status(401).send({status: false, msg: "token is invalid"})
        }
        req.token = decodedToken
        next()
    } catch (error) {
        return res.status(500).send({status: false, msg: error.message})
    }
}


const authorisation = async function (req, res, next){
    try {
        let bookId = req.params.bookId
        let findBook = await bookModel.findById(bookId)
        if(!findBook){
            return res.status(404).send({status: false, msg: "bookId not found"})
        }
        if(findBook){
            if(req.token.userId != findBook.userId){
                return res.status(403).send({status: false, msg: "User is not authorized to access this data"})
            }
        }
        next()
    } catch (error) {
        return res.status(500).send({status: false, msg: error.message})
    }
}

// let decodedId = req.token.userId

// let userId = req.body.userId
// if(decodedId !== userId){
//     return res.status(403).send({status: false, msg: "unauthorised access"})
// }


module.exports = {authentication, authorisation}