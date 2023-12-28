const { COMPANY, JOBSEEKER } = require("../constants/role");
const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "required field"]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (req_value) {
                let count = await mongoose.models.User.countDocuments({ email: req_value })

                if (count) {
                    return false
                }
                return true;
            },
            message: "email alredy used.."
        }

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        required: true,
        type: String,
        enum: [COMPANY, JOBSEEKER],
        set: function (value) {
            return value.toLowerCase();
        }
    },
    contact: {
        type: String,
      },

      address: {
        type: String,
      },
      prefered_job: {
        type: String,
      },
      degree: {
        type: String,
      },
      field_of_study: {
        type: String,
      },
      university: {
        type: String,
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
      },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema)