const jwt = require("jsonwebtoken");

const verification = function(req, res, next){
    let token = req.headers["x-auth-token"]
    if(!token)
    {
        return res.send({ status: false, msg: "Token must be present" })
    }
    else
    {
        
        let decodedToken = jwt.verify(token, "This is a secret information");
        console.log(decodedToken)
        let verUser = decodedToken.userId
        let uId = req.params.userId
        if(verUser == uId){

            next()
        }
        else {
          return res.send({ status: false, msg: "Token is invalid" });
        }
    }
   
}

module.exports.verification = verification