const Joi = require("joi")
const User = require("../model/User")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")


const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email().required()
})


const signup = async (req, res, next) => {
    try {
        let { error } = schema.validate(req.body,
            {
                abortEarly: false,
                stripUnknown: false,
                allowUnknown: true,
            })

        // console.log("errors", error?.details)

        if (error?.details) {
            let errors = error?.details.map(err => {
                return{
             params : err.path,
             msg : err.message
                 }
         
                })
          
            res.status(400).send({
                // errors: error?.details
                errors
            })
            return;
        }

        let hashed = await bcrypt.hash(req.body.password, 10);

        let user = await User.create({ ...req.body, password: hashed })

        user = user.toObject()
        delete user.password
        res.send(user)

    } catch (err) {
        next(err)
    }
}


const loginSchemaValidation = Joi.object({
  password: Joi.string().required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email().required()
})


const login = async (req, res, next) => {

  try {

      let { error } = loginSchemaValidation.validate(req.body,
          {
              abortEarly: false,
              stripUnknown: false,
              allowUnknown: true,
          })


    //   if (error?.details) {
    //       res.status(400).send({
    //           errors: error?.details
    //       })
    //       return;
    //   }

    if (error?.details) {
        let errors = error?.details.map(err => {
            return{
         params : err.path,
         msg : err.message
             }
     
            })
      
        res.status(400).send({
            // errors: error?.details
            errors
        })
        return;
    }


      let user = await User.findOne({ email: req.body.email }).select("+password")


      if (user) {

          let matched = await bcrypt.compare(req.body.password, user.password);
          if (matched) {

              let userObj = user.toObject()
              delete userObj.password;

              let token = jwt.sign(userObj, process.env.JWT_SECRET_KEY);


              res.send({
                  msg: "login successful",
                  token
              })
              return;
          }

      }

      res.status(401).send({
          msg: "Invalid Credentaions"
      })

  }
  catch (err) {
      next(err)
  }


}

module.exports = {
  signup,
  login
}