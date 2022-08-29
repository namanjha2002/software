const mongoose=require('mongoose');
const productSchema=new mongoose.productSchema(
    {
        name: String,
        category : String,
        price : {
            type : Number,
            required : true
        }

    },
    { timestamps : true}
)
module.exports=mongoose.model("product",productSchema)