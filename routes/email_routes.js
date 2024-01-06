const express = require('express')
const router = express.Router()

const {sendAcceptEmail, sendRejectEmail} = require('../controller/email_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/accept",authenticationCheck, sendAcceptEmail) 
router.post("/reject",authenticationCheck, sendRejectEmail) 

module.exports = router