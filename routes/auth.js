const express = require('express')
const router = express.Router()
const {signup, login, getUser} = require('../controller/auth')
const{ authenticationCheck} = require('../middleware/authenticationCheck')



router.post("/signup", signup)
router.post("/login", login)
router.get("/get-user", authenticationCheck, getUser)


module.exports = router