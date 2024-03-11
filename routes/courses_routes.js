const express = require('express')
const router = express.Router()

const {createCourses, getCourses, fetchSingleCourse} = require('../controller/courses_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/", authenticationCheck, createCourses) 
router.get("/", getCourses) 
router.get("/:id", fetchSingleCourse) 

module.exports = router