const express = require('express')
const router = express.Router()

const {recommendation} = require('../controller/recommendation_controller')
const{ authenticationCheck, isSeeker} = require('../middleware/authenticationCheck')

router.get("/",authenticationCheck, isSeeker, recommendation) 


module.exports = router