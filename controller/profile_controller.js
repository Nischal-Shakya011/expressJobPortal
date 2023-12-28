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
module.exports ={
    createProfile
}