const express = require('express')
const router = express.Router()

const {sendEmail} = require('../controller/email_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/",authenticationCheck, sendEmail) 


module.exports = router