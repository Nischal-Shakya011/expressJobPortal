const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required : true
    },
  
    created_by: {
            required: true,
            type: ObjectId,
            ref: "User"
        },

},{
    timestamps: true,
});

module.exports = mongoose.model('Course',CourseSchema);