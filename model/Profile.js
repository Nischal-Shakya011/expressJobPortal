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
   
    created_by: {
            required: true,
            type: ObjectId,
            ref: "User"
        },

       

},{
    timestamps: true,
});

module.exports = mongoose.model('Profile', ProfileSchema);