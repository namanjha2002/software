const moment =require('moment');
const middleware= function(req,res,next){
    const user= req.headers.isfreeappuser
    if(!user){
        return res.send({msg:"error this field is mandatory"})
    }
    req.body["isFreeAppUser"]=user
    next()
}
module.exports.middleware=middleware