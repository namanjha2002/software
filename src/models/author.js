const mongoose = require('mongoose');
const authorsSchema = new mongoose.Schema(
    {
authot_id:{
    type:Number,
    required:true
},
authot_name:String,
age : Number,
address : String},

    
    {timestamps:true}
)
module.exports=mongoose.model('newAuthor',authorsSchema)