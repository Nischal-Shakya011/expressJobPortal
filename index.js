const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')

const auth_routes = require('./routes/auth')
const job_routes = require('./routes/job_routes')
const apply_routes = require('./routes/apply_routes')

const { handleResourceNotFound, handleServerError} = require('./middleware/handleError')
const {arrayImage} = require('./middleware/images')

require('./config/db')
require('dotenv').config()
app.use(express.json()) //for normal data
app.use(fileUpload()); //for files
app.use(express.static('uploads'))
app.use(cors())



app.use(arrayImage)


app.use('/api', auth_routes)
app.use('/api/jobs', job_routes)
app.use('/api/apply', apply_routes)

app.use(handleResourceNotFound)
app.use(handleServerError)

app.listen(8001, ()=>{
    console.log("server started");
})