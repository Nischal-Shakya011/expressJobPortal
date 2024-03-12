const express = require('express')
const router = express.Router()

const {recommendation} = require('../controller/recommendation_controller')
const {popularityBasedRecommendation} = require('../controller/popularity_controller')
const{ authenticationCheck, isSeeker} = require('../middleware/authenticationCheck')

router.get("/",authenticationCheck, isSeeker, recommendation) 
router.get("/popularity",authenticationCheck, isSeeker, popularityBasedRecommendation) 


module.exports = router