const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer")
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const sendAcceptEmail = expressAsyncHandler(async(req, res)=>{
    const { email, subject, message } = req.body;
    console.log(email, subject, message);
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        // html : `<h1>${message}</h1>`
        html : `<p>${message}</p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent successfully!");
        }
    })
  });

  const sendRejectEmail = expressAsyncHandler(async(req, res)=>{
    const { email } = req.body;
    console.log(email, subject, message);
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html : `<p>${message}</p>`
        // html : `<p>Dear,<br/>
        // We appreciate the time and effort you invested in applying for this job at our Company.
        // After careful consideration, we regret to inform you that we have chosen to move forward with 
        // other candidates whose qualifications more closely align with our current needs.
        // We encourage you to continue exploring opportunities that match your skills and career goals.
        // And we want to encourage you to monitor our courses for growing your skills according to your interest.
        // <br/>https://react-job-portal-one.vercel.app/jobStatus
        // <br/>Thank you once again for your interest in our Company. We wish you continued success in your career endeavors.
        // </p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent successfully!");
        }
    })
  });

  module.exports = {
    sendAcceptEmail,
    sendRejectEmail,
  }