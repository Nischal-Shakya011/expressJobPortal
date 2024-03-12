const Joi = require("joi")
const Course = require("../model/Course")
const Training = require("../model/Training")

const createCourses = async (req, res, next) => {
    try {   
    let course = await Course.create({...req.body, created_by: req.user._id})
        res.send(course)
    } 
    
    catch (err) {
        next(err)
    }
}
const getCourses = async (req, res, next) => {
    try {
  

    let training = await Course.find();
        res.send(training)
    } 
    
    catch (err) {
        next(err)
    }
}
const fetchSingleCourse = async (req, res, next)=>{

    try{
   
        let job = await Course.findById(req.params.id)
        
        if(job){
            res.send(job)
        }
        else
        {
            res.status(404).send({
                msg:"Resource not found"
            })
        }

    }
    catch(err){
      next(err)
    }
}
const createApplicants = async (req, res, next) => {
    try {   
    let train = await Training.create({...req.body, created_by: req.user._id})
        res.send(train)
    } 
    
    catch (err) {
        next(err)
    }
}
const getApplicants = async (req, res, next) => {
    try {
  

    let gettrain = await Training.find();
        res.send(gettrain)
    } 
    
    catch (err) {
        console.log(err)
        next(err)
    }
}


module.exports ={
    createCourses,
    getCourses,
    fetchSingleCourse,
    createApplicants,
    getApplicants
}