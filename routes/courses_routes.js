const express = require('express')
const router = express.Router()

const {createCourses, getCourses, fetchSingleCourse, createApplicants, getApplicants} = require('../controller/courses_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post("/", authenticationCheck, createCourses) 
router.get("/", getCourses) 
router.get("/:id", fetchSingleCourse) 
router.post("/applicant", authenticationCheck, createApplicants) 
router.get("/training/applicants", authenticationCheck, getApplicants) 


module.exports = router