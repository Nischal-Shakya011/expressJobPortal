const Job = require('../model/Job')
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

}
let createApplyJob = await Apply.create({ jobs: appliedJobs, created_by: req.user._id })
  res.send(createApplyJob)

    }
    catch(err){
        next(err)
    }
}
module.exports =
{
    createApply,
    getApply,
    fetchSingleApply
}