const Joi = require("joi")
const Profile = require("../model/Profile")
const fetch = require("node-fetch")

async function getPosts(){
//     POST https://api.coursera.com/oauth2/client_credentials/token HTTP/1.1

// Authorization: Basic [YOUR_AUTH_INFO]
// Accept: application/json
// Content-Type: application/x-www-form-urlencoded

// https://api.coursera.com/oauth2/client_credentials/token

//     const myPosts = await fetch("https://api.coursera.com/oauth2/client_credentials/token HTTP/1.1", 
//     "Authorization": "bearer 5ZVqGHUF97vCoWJNVys9jvtFcgY2" ,
// "Accept": application/json
// "Content-Type": application/x-www-form-urlencoded);
//     const response = await myPosts.json();
    console.log("response");
}
getPosts();


const createCourses = async (req, res, next) => {
    try {   
    console.log("courses")
    }
    catch (err) {
        next(err)
    }
}


module.exports ={
    createCourses
}