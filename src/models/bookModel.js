const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})