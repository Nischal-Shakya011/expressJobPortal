const { default: mongoose } = require("mongoose");

const Job = require("./Job");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ApplySchema = new Schema({
    jobs: {
        type: [
            {
                job_id: {
                    type: ObjectId,
                    ref: "Job",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                deadline: {
                    type: Date,
                    required: true,
                },
                job_level: {
                    type: String,
                    require: true,
                },
                offered_salary: {
                    type: Number,
                    require: true,
                    min: 0
                }
            }
        ],
        required: true,
        validate: {
            validator: function (value) {
                if (value.length == 0) return false
            },
            message: "atleast one applied job needed"

        }
    },
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Apply', ApplySchema)

