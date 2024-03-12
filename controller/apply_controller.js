const Job = require('../model/Job')
const Profile = require('../model/Profile')
const Apply = require('../model/Apply')

let getApply = async (req, res, next)=>{
    try{
let appJob = await Apply.find({created_by : req.user._id})
res.send(appJob)
    }
    catch(err)
    {
        next(err)
    }
}

const fetchSingleApply = async (req, res) => {
    let apply = await Apply.findById(req.params.id)
    res.send(apply)
}

let createApply = async (req, res, next)=>{
    try{
let appliedJobs = [];

for(job of req.body.jobs){
    let dbJobs = await Job.findById(job.job_id)
    appliedJobs.push(
        {
            job_id: dbJobs._id,
            name:dbJobs.name,
            deadline:dbJobs.deadline,
            job_level:dbJobs.job_level,
            offered_salary:dbJobs.offered_salary  
        }
    )
  // Increment the numApplications field
  dbJobs.numApplications += 1;

  // Save the updated job with the incremented numApplications
  await dbJobs.save();
}
let prof = await Profile.findOne({created_by: req.user._id})
let createApplyJob = await Apply.create({ jobs: appliedJobs, created_by: req.user._id, profile: prof._id})
  res.send(createApplyJob)

    }
    catch(err){
        next(err)
    }
}

    let getApplicantsForJob = async (req, res, next) => {
        try {
          const jobId = req.params.id;

    
          const job = await Job.findById(jobId);
          if (!job) {
            return res.status(404).json({ message: 'Job not found' });
          }
      
          const applicants = await Apply.find({ 'jobs.job_id': jobId })
            // .populate('created_by', 'name email role')
            .populate('profile', 'name email contact_no address prefered_job degree field_of_study university position organization job_level roles experience skills')
         

          res.json({applicants});
        } catch (error) {
          next(error);
        }
      };


module.exports =
{
    createApply,
    getApply,
    fetchSingleApply,
    getApplicantsForJob
}