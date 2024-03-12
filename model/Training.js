const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: String,
        required: true,
    },
    selected_course: {
        type: String,
        required: true,
    },
    message: {
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

module.exports = mongoose.model('Training', TrainingSchema);