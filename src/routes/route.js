const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
}

    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})

router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    res.send("dummy response")
})

// uses query params
router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       //send all the films
      res.send(films) 
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId

       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")
})
//1
router.get("/pr1", function(req, res){
let a=[1,2,3,5,6,7];
let total = (a.length+1)*(a.length+2)/2;
for(i=0;i<a.length;i++){
    total=total-a[i]
}
console.log(total)
res.send(total)

})
//2
router.get("/pr1", function(req, res){
    let b =[33, 34, 35, 37, 38]
    let sum = (b.length+1)*(33+38)/2;
    for(i=0;i<b.length;i++){
        sum=sum-b[i]
    }
    console.log(sum)
    res.send(sum)
})
router.post('/test-post-4',function(req,res){
    console.log(req.body)
    res.send([25,26,27,28])

})
let players =
  [
    {
      "name": "manish",
      "dob": "1/1/1995",
      "gender": "male",
      "city": "jalandhar",
      "sports": [
        "swimming"
      ]
    },
    {
      "name": "gopal",
      "dob": "1/09/1995",
      "gender": "male",
      "city": "delhi",
      "sports": [
        "soccer"
      ],
    },
    {
      "name": "lokesh",
      "dob": "1/1/1990",
      "gender": "male",
      "city": "mumbai",
      "sports": [
        "soccer"
      ],
    } 
  ]

  router.post('/players1', function (req, res) {
    //LOGIC WILL COME HERE
    let newplayer = req.body
    let n = newplayer.name
  
    for (i = 0; i < players.length; i++) {
      if (players[i].name == n) {
        return res.send("Sorry, This name is already exist!")
      }
    }
    players.push(newplayer)
    res.send({players})
  
  });

  //1 query prblm
  router.post("/post2", function (req, res) {
    let persons = [
        {
            "name": "pk",
            "age": 10,
            "votingstatus": false
        }, {
            "name": "sk",
            "age": 20,
            "votingstatus": false
        }, {
            "name": "aa",
            "age": 70,
            "votingstatus": false
        }, {
            "name": "sc",
            "age": 5,
            "votingstatus": false
        }, {
            "name": "Ho",
            "age": 40,
            "votingstatus": false
        }
    ]
    let inputage = req.query.age
    let ab = []
     for (i = 0; i < persons.length; i++) {
        if (persons[i].age > inputage) {
            persons[i].votingstatus = true
            ab.push(persons[i])
        }
    }
    res.send({ ab })
});
router.post('/namo-2',function (req,res){
  let id = req.body.user
  let pwd = req.body.name
  console.log(id,pwd)
  console.log(req.body)
  res.send({a:56,b:569})

})
router.post('/namo-3',function(req,res)
{
  let a =[256,"namano"]
  let b = req.body.ele
  a.push(b)
  res.send({msg:a,status:true})
})
//players question
router.get("/nimo-5",function(req, res){
  let marks = req.query.marks
  let result = marks>40 ? "pass" :"fail"
  res.send({data:result,status:true})
}

)
let myarr=[23,46,78,897,76,87,90,76,908,706,806,507,609,78,89,]
router.get("/nimo-4",function(req,res){
let input = req.query.input
let final = myarr.filter(ele=>ele>input)
res.send({data:final,status:true})
})




module.exports = router;
// adding this comment for no reason