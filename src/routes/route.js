const express = require('express');
const router = express.Router();
const controller= require("../controllers/cowinController")

router.get("/cowin/getVacSession", controller.getVacSession)
router.get("/getCity", controller.getCity)
router.post("/imgFlip", controller.imageFlip)

module.exports = router;