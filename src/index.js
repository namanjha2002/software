const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://FunctionUp_Cohort:DBvLSBGGXkLLWXB5@cluster0.dgozj7b.mongodb.net/Naman04_db", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

const moment =require('moment')
const time = moment();
app.use(
    function(req,res,next){
        console.log("middleware assingnment ")
        console.log(time.format('YYYY,MM,DD'))
        console.log(time.format('h:mm:ss'))
        console.log(req.ip)
        console.log(req.originalUrl)
    }
)
  

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
