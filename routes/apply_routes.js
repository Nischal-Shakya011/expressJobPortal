const express = require('express')
const router = express.Router()

const {createApply, getApply, fetchSingleApply} = require('../controller/apply_controller')
const {authenticationCheck, isSeeker} = require('../middleware/authenticationCheck')

router.post('/',authenticationCheck, isSeeker, createApply)
router.get('/',authenticationCheck, isSeeker, getApply)
router.get('/:id',authenticationCheck, isSeeker, fetchSingleApply)

module.exports = router