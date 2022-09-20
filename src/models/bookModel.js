const mongoose = require('mongoose')
<<<<<<< HEAD

const bookSchema = new mongoose.Schema({
    title:{
=======
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({
    title: {
>>>>>>> f945aa38599f21876320a9d2e0749ef827e1e262
        type: String,
        required: true,
        unique: true,
        trim: true
<<<<<<< HEAD
    }
})
=======
},
excerpt: {
    type: String,
    required: true,
    trim: true
},
userId: {
    type:ObjectId,
    required: true,
    ref:'P3-User'
},
ISBN:{
    type:String,
    required: true,
    unique: true,
    trim: true
},
category: {
    type:String,
    required: true,
    trim: true
    },

 subcategory: {
    type : [String],
    required : true,
    trim: true
},
reviews :{
    type:Number,
    default:0,
},
deletedAt: { 
    type: Date,
    default:null 
},
isDeleted: {
    type: Boolean,
    default: false
},
releasedAt: {
    type: Date,
    required: true
},

},{timestamps:true});

module.exports = mongoose.model('P3-Book', bookSchema)
>>>>>>> f945aa38599f21876320a9d2e0749ef827e1e262
