import mongoose, { Schema } from "mongoose";
const {schema} = mongoose;

const Schema = new Schema({
    firstname: String,
    lastname: String,
    mobile: {
        type: String,
        unique: true,
        required:true
    },
    
},{timestamps: true}

)
module.exports=mongoose.model('user',userSchema)