const express = require('express')
const router = express.Router()

const {createApply, getApply, fetchSingleApply, getApplicantsForJob} = require('../controller/apply_controller')
const {authenticationCheck, isSeeker, isCompany} = require('../middleware/authenticationCheck')

router.post('/',authenticationCheck, isSeeker, createApply)
router.get('/',authenticationCheck, isSeeker, getApply)
router.get('/:id',authenticationCheck, isSeeker, fetchSingleApply)
router.get('/applicants/:id',authenticationCheck, isCompany, getApplicantsForJob)

module.exports = router