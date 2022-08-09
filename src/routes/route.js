const e = require('express');
const express = require('express');
// node const abc = require('../logger/logger.js')
const router = express.Router();
//1
router.get('/movies', function (req, res) {
    let film=["raone","iron man", "spider man " ]
    
    

    res.send(film)
});
//2
router.get('/movies/:indexNumber', function (req, res){
    let film1 = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let a = req.params.indexNumber;
    console.log(film1[a])
    res.send(film1[a])
})
//3
router.get('/movies1/:indexNumber', function(req, res){
    let film3 = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let b = req.params.indexNumber;
    if(b > film3.length){
        return res.send("length is greater")
    }else{
        res.send(film3[b])
    }
})
//4
router.get('/films',function(req, res){ //student detail api he    

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    res.send(moviesName)
})
//5
router.get('/films/:indexNumber',function(req, res){ //student detail api he    

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    let index = req.params.indexNumber;
     if(index > moviesName.length){
        return res.send("no movie exist with this id ")
     }else{
     res.send(moviesName[index])
     }
})
module.exports = router;

    

    