const Joi = require("joi")
const Course = require("../model/Course")

const createCourses = async (req, res, next) => {
    try {   
    let course = await Course.create({...req.body, created_by: req.user._id})
        res.send(course)
    } 
    
    catch (err) {
        next(err)
    }
}




module.exports ={
    createCourses
}