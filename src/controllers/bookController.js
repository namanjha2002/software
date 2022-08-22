const bookModel2 = require("../models/bookModel")
const authorModel = require("../models/author")


// 1 create
let createBook=async function(req,res){
let data=req.body
let x=await bookModel2.create(data)
res.send({msg:x})
}
// create author 
    let createAuthor=async function(req,res){
    let dataAuthor=req.body
    let authorCreate=await authorModel.create(dataAuthor)
    res.send({msg:authorCreate})
    
}
// 2 chetan bhagat books
let Chetan_books=async function(req,res){
let data=await authorModel.find({author_name:"chetan bhagat"})
let findBook=await bookModel2.find({author_id : {$eq : data[0].author_id}})
res.send({msg:findBook})


}
// 3  finding and updating 2 states price and auther
let TwoStates=async function(req,res){
let a=await bookModel2.findOneAndUpdate({name:"two states"},{price:100})
let b=await authorModel.find({author_id:{$eq:a.author_id}}).select({author_name:1,_id:0})
res.send({msg:b})

}

// 4 
let mid=async function(req,res){
    let midPrice=await bookModel2.find({price:{$gte:50,$lte:100}})
let Store=midPrice.map(ele =>ele.author_id);//we are using function becoz we are performing further function on function means high order function
let allBooks=await authorModel.find({author_id:Store}).select({author_name :1})



    res.send(allBooks)

}



module.exports.createBook=createBook
module.exports.createAuthor=createAuthor
module.exports.Chetan_books=Chetan_books
module.exports.TwoStates=TwoStates
module.exports.mid=mid