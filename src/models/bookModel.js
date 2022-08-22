const mongoose = require('mongoose');
const booksSchema=new mongoose.Schema({
    bookname : String,
    author_id:{
        type : Number,
        required : true
    },
    price: Number,
    ratings: String
},{timestamps:true})

module.exports=mongoose.model('book',booksSchema)