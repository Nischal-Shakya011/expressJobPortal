const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const auth_routes = require('./routes/auth')
const job_routes = require('./routes/job_routes')
const apply_routes = require('./routes/apply_routes')

const { handleResourceNotFound, handleServerError} = require('./middleware/handleError')

require('./config/db')
require('dotenv').config()
app.use(express.json()) //for normal data
app.use(fileUpload()); //for files
app.use(express.static('uploads'))


//custom middleware for making array of images even if only one image is passed
app.use((req, res, next) => {

    function changeRequest(field) {

        let temp = {};

        if (req[field]) {
            let temp_arr = Object.entries(req[field])

            temp_arr.forEach(el => {
                if (el[0].endsWith("[]")) {
                    temp[el[0].slice(0, -2)] = Array.isArray(el[1]) ? el[1] : [el[1]]
                } else {
                    temp[el[0]] = el[1]
                }
            })
        }

        req[field] = temp
    }

    changeRequest("body")
    changeRequest("files")

    next()

})


app.use('/', auth_routes)
app.use('/jobs', job_routes)
app.use('/apply', apply_routes)

app.use(handleResourceNotFound)
app.use(handleServerError)

app.listen(8001, ()=>{
    console.log("server started");
})