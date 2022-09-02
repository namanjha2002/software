const jwt = require("jsonwebtoken");

const checkToken = function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
        if (!token) {
            return res.status(400).send({ status: false, msg: "Token must be present" })
        }
        else {

            let decodedToken = jwt.verify(token, "This is a secret information");
            console.log(decodedToken)
            if (decodedToken) {
                let verUser = decodedToken.userId
                let uId = req.params.userId
                if (verUser == uId) {
                    next()
                }
                else {
                    return res.status(403).send({ status: false, msg: "Unauthorized User" });
                }
            }
            else {
                return res.status(401).send({ status: false, msg: "Token is invalid" });
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.checkToken = checkToken