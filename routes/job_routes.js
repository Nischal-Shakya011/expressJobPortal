const express = require('express')
const router = express.Router()

const {createJob, get, fetchSingleJOb, fetchJobStatus, getPostedjobs} = require('../controller/job_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.get("/", get)
router.get("/posted",authenticationCheck, isCompany, getPostedjobs) 
router.get("/:id", fetchSingleJOb)
router.post("/", authenticationCheck, isCompany, createJob) //create jobs
// router.get("/stat", authenticationCheck, isCompany, fetchJobStatus) 

module.exports = router