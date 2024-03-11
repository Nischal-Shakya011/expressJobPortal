const express = require('express')
const router = express.Router()

const {createCourses} = require('../controller/courses_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/", authenticationCheck, createCourses) 

module.exports = router