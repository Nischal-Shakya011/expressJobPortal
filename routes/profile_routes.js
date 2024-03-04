const express = require('express')
const router = express.Router()

const {createProfile, getProfile} = require('../controller/profile_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/",authenticationCheck, createProfile) 
router.get("/",authenticationCheck, getProfile) 


module.exports = router