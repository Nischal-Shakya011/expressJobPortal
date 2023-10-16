const express = require('express')
const router = express.Router()

const {createJob, get, fetchSingleJOb, fetchJobStatus, getPostedjobs, editJob, deleteJob} = require('../controller/job_controller')
const{ authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.get("/", get)
router.get("/posted",authenticationCheck, isCompany, getPostedjobs) 
router.get("/:id", fetchSingleJOb)
router.post("/", authenticationCheck, isCompany, createJob) //create jobs
router.put("/:id", authenticationCheck, isCompany, editJob)
router.delete("/:id", authenticationCheck, isCompany, deleteJob)
// router.get("/stat", authenticationCheck, isCompany, fetchJobStatus) 

module.exports = router