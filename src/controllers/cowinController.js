let axios = require("axios")

// vaccine by district 

const getVacSession = async function(req,res){
    try{
        let id = req.query.id
        let date = req.query.date
        let option = {
            method : "get",
            url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(option)
        res.status(200).send(result.data)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

// city with temperature

const getCity = async function(req,res){
    try{
        // let city = req.query.city
        let key = req.query.key
        let cityWithTemp = []
        let city= ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        for(let i=0;i<city.length;i++){
            let options = {
                method:'get',
                url : `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${key}`
            }
            let result = await axios(options)
            cityWithTemp.push({city:city[i],temp:result.data.main['temp']})
        }
        let sortedCity = cityWithTemp.sort((a,b) => a.temp - b.temp)
        res.status(200).send(sortedCity)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

// meme creation

const imageFlip = async function(req,res){
    try{
        let imageId = req.query.imageId
        let textOne = req.query.textOne
        let textTwo = req.query.textTwo
        let userName = req.query.userName
        let password = req.query.password
        if(!textTwo){
            option = {
                method : 'post',
                url : `https://api.imgflip.com/caption_image?template_id=${imageId}&text0=${textOne}&username=${userName}&password=${password}`
            }   
        }else
        {
            option = {
                method : 'post',
                url : `https://api.imgflip.com/caption_image?template_id=${imageId}&text0=${textOne}&text1=${textTwo}&username=${userName}&password=${password}`
            }
        }
        let editedImg = await axios(option)
        res.status(200).send(editedImg.data) 
    }
    catch(err){
        res.status(500).send(err.message)
    }

}


module.exports.getVacSession = getVacSession
module.exports.getCity = getCity
module.exports.imageFlip = imageFlip