const express = require('express')
const router = express.Router()

const {createProfile} = require('../controller/profile_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/",authenticationCheck, isSeeker, createProfile) 


module.exports = router