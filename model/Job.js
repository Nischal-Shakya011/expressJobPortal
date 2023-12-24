const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const {FRONTEND, BACKEND} = require('../constants/category')
const {FRESHER, JUNIOR, MID, SENIOR} = require('../constants/job_level')
const { TOP, HOT, FEATURED, NORMAL} = require('../constants/job_type')
const { ACTIVE, INACTIVE} = require('../constants/job_status')


const JobSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    company_name: {
        type: String,
        required: true,
        maxlength: 30
    },
    company_website: {
        type: String,
        required: true,
        maxlength: 30
    },
    contact_no: {
        type: Number,
        required: true,
    },
    categories:{
        type: [String],
        required: true,
        enum : [FRONTEND, BACKEND],
        set: function (value) {
           let category =  value.map((cat)=>{
                return cat.toLowerCase();
            })
            return category;    
    }
    },
    job_level:{
        type: String,
        required: true,
        enum : [FRESHER, JUNIOR, MID, SENIOR],
        set: function (value) {
            return value.toLowerCase();
        }
    },
    number_of_vacancy :{
        type : Number,
        required : true,
        min : 0
    },

    location: {
        type: String,
        max: 30,
        required: true
    },

    offered_salary : {
        type : Number,
        min : 0,
        required : true
    },

    deadline : {
        type : Date,
        required: true
    },
    application_start : {
        type : Date,
        required: true
    },

    status : {
       type: String,
       enum:[ACTIVE, INACTIVE],
       set : function(value){
       return value.toLowerCase();
      }
    },

    // job_type : {
    //     type: String,
    //     enum : [TOP, HOT, FEATURED, NORMAL],
    //     set: function (value) {
    //         return value.toLowerCase();
    //     }
    // },
    created_by: {
            required: true,
            type: ObjectId,
            ref: "User"
        },

        description: {
                type: String,
                required : true
            },

            images: {
                    type: [String],
                },

                applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apply' }],


},{
    timestamps: true,
});

module.exports = mongoose.model('Job', JobSchema);