const product1=require('../models/prodctModel')

const createProduct =async function(req,res){
    let product = req.body
    let savedProduct = await product1.create(product)
    res.send({msg:savedProduct})
}

module.exports.createProduct=createProduct

