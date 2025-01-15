const Joi = require("joi");
const Job = require("../model/Job");
const path = require("path");

const get = async (req, res, next) => {
  try {
    let activeJobs = await Job.find({ status: "active" });
    let expiredJobs = await Job.find({ status: "inactive" });

    let activeCount = activeJobs.length;
    let expiredCount = expiredJobs.length;

    let search_term = req.query.search_term || "";
    let job_level = req.query.job_level || "";
    let page = parseInt(req.query.page) || 1;
    let per_page = parseInt(req.query.per_page) || 5;

    let total = await Job.aggregate([
      // {
      //     $match: {
      //         $or: [
      //             { name: RegExp(search_term, "i") },
      //             { categories: RegExp(search_term, "i") }
      //         ]
      //     }
      // },
      {
        $match: {
          $and: [
            {
              $or: [
                { name: RegExp(search_term, "i") },
                { categories: RegExp(search_term, "i") },
              ],
            },
            { job_level: RegExp(job_level, "i") },
          ],
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $unwind: "$created_by",
      },
      {
        $project: {
          "created_by.password": 0,
          "created_by.updatedAt": 0,
          "created_by.role": 0,
        },
      },
      {
        $count: "total",
      },
    ]);
    let jobs = await Job.aggregate([
      // {
      //     $match: {
      //         $or: [
      //             { name: RegExp(search_term, "i") },
      //             { categories: RegExp(search_term, "i") }
      //         ]
      //     }
      // },
      {
        $match: {
          $and: [
            {
              $or: [
                { name: RegExp(search_term, "i") },
                { categories: RegExp(search_term, "i") },
              ],
            },
            { job_level: RegExp(job_level, "i") },
          ],
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $unwind: "$created_by",
      },
      {
        $project: {
          reviews: 0,
          "created_by.password": 0,
          "created_by.updatedAt": 0,
          "created_by.role": 0,
        },
      },
      {
        $skip: (page - 1) * per_page,
      },
      {
        $limit: per_page,
      },
    ]);
    // let query = {}
    // if (req.user) {
    //     // const userId = req.user._id;
    //     query.created_by = req.user._id;

    // let userJobs = await Job.find(query);
    //     // userJobs = await Job.find({ "created_by": req.user._id });
    // }
    const totalJobs = total?.[0]?.total || 0;
    res.send({
      meta_data: {
        // total: total[0].total,
        total: totalJobs,
        page,
        per_page,
      },
      jobs: jobs,
      active: activeCount,
      expired: expiredCount,
      // user_Jobs : userJobs
    });
  } catch (err) {
    next(err);
  }
};
const getPostedjobs = async (req, res, next) => {
  try {
    const userJobs = await Job.find({ created_by: req.user._id });

    res.send(userJobs);
  } catch (err) {
    next(err);
  }
};

const jobCreateSchema = Joi.object({
  name: Joi.string().required(),
  number_of_vacancy: Joi.number().required(),
});

const createJob = async (req, res, next) => {
  try {
    let { error } = jobCreateSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    // console.log("errors", error?.details)

    if (error?.details) {
      res.status(400).send({
        errors: error?.details,
      });
      return;
    }

    let images = [];
    // console.log(req.files);

    req.files.images?.forEach((img) => {
      let img_name =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + img.name; //from multer to make name of pictures different
      let img_res = img.mv(path.join(__dirname, "../uploads/" + img_name)); //to uploads the pictures on "uploads" file
      // console.log(img_res)

      images.push(img_name);
    });

    const { deadline } = req.body;

    const currentDate = new Date();
    const status = currentDate > new Date(deadline) ? "inactive" : "active";

    let job = await Job.create({
      ...req.body,
      created_by: req.user._id,
      images,
      status,
    });
    res.send(job);
  } catch (err) {
    next(err);
  }
};

const fetchSingleJOb = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id).populate(
      "created_by",
      "name email"
    );

    if (job) {
      res.send(job);
    } else {
      res.status(404).send({
        msg: "Resource not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByIdAndRemove(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(err);
  }
};

const editJob = async (req, res, next) => {
  const jobId = req.params.id;
  const updatedData = req.body;

  try {
    // Check if the job with the given ID exists
    const existingJob = await Job.findById(jobId);

    if (!existingJob) {
      return res.status(404).send({ message: "Job not found" });
    }

    // Update the job data
    Object.assign(existingJob, updatedData);

    // Save the updated job
    const updatedJob = await existingJob.save();

    return res.send(updatedJob);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  get,
  fetchSingleJOb,
  getPostedjobs,
  editJob,
  deleteJob,
};
