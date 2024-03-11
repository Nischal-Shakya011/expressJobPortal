const Joi = require("joi")
const Profile = require("../model/Profile")

const createProfile = async (req, res, next) => {
    try {   
    let profile = await Profile.create({...req.body, created_by: req.user._id})
        res.send(profile)
    } 
    
    catch (err) {
        next(err)
    }
}

const getProfile = async (req, res, next) => {
    try {
  

    let user = await Profile.findOne({created_by: req.user._id})
        res.send(user)
    } 
    
    catch (err) {
        next(err)
    }
}
module.exports ={
    createProfile, getProfile
}