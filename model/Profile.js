const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        maxlength: 30
    },
   
    contact_no: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        max: 30,
        required: true
    },
    prefered_job: {
        type: String,
        required: true,

      },

      degree: {
        type: String,
        required: true,
        
      },

      field_of_study: {
        type: String,
        required: true,

      },

      university: {
        type: String,
        required: true,

      },

      position: {
        type: String,
      },

      organization: {
        type: String,
      },

      job_level: {
        type: String,
      },

      roles: {
        type: String,
      },

      experience: {
        type: String,
      },
      
      skills: {
        type: String,
        required: true,
      },
   
    created_by: {
            required: true,
            type: ObjectId,
            ref: "User"
        },

       

},{
    timestamps: true,
});

module.exports = mongoose.model('Profile', ProfileSchema);