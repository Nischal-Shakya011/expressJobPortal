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


module.exports ={
    createCourses,
    getCourses,
    fetchSingleCourse
}