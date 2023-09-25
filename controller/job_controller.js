const Joi = require("joi")
const Job = require("../model/Job")
const path = require("path")


const get = async (req, res, next)=>{
    try{

            let activeJobs = await Job.find({"status" : "active"});
            let expiredJobs = await Job.find({"status" : "inactive"});
          
            let activeCount = activeJobs.length;
            let expiredCount = expiredJobs.length;
          
         

        let search_term = req.query.search_term || ""
        let page = parseInt(req.query.page) || 1
        let per_page = parseInt(req.query.per_page) || 5

      

        let total = await Job.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { name: RegExp(search_term, "i") },
                            { categories: RegExp(search_term, "i") }
                        ]
                    }
                },
            
                {
                    $lookup: {
                        from: "users",
                        localField: "created_by",
                        foreignField: "_id",
                        as: "created_by"
                    }
                },
                {
                    $unwind: "$created_by"
                },
                {
                    $project: {
                        "created_by.password": 0,
                        "created_by.updatedAt": 0,
                        "created_by.role": 0,
                    }
                },
                {
                    $count: "total"
                }



            ]
        )
        let jobs = await Job.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { name: RegExp(search_term, "i") },
                            { categories: RegExp(search_term, "i") }
                        ]
                    }
                },
              
                {
                    $lookup: {
                        from: "users",
                        localField: "created_by",
                        foreignField: "_id",
                        as: "created_by"
                    }
                },
                {
                    $unwind: "$created_by"
                },
                {
                    $project: {
                        reviews: 0,
                        "created_by.password": 0,
                        "created_by.updatedAt": 0,
                        "created_by.role": 0,
                    }
                },
                {
                    $skip: ((page - 1) * per_page)
                },
                {
                    $limit: per_page
                },
            ]
        )

        res.send({
            meta_data: {
                total: total[0].total,
                page,
                per_page
            },
            jobs: jobs,
            active: activeCount,
            expired: expiredCount 
        })
    }
    catch(err){
        next(err);
    }
}
const getPostedjobs = async (req, res, next)=>{
    try{
const userJobs = await Job.find({ created_by: req.user._id });

res.send(userJobs);
} 
catch (err) {
next(err);
}
}



const jobCreateSchema = Joi.object({
    name: Joi.string().required(),
    number_of_vacancy: Joi.number().required()
})

const createJob = async (req, res, next) => {
    try {

        let { error } = jobCreateSchema.validate(req.body,
            {
                abortEarly: false,
                allowUnknown: true,
            })

        // console.log("errors", error?.details)

        if (error?.details) {
            res.status(400).send({
                errors: error?.details
            })
            return;
        }

let images = [];
// console.log(req.files);

  req.files.images?.forEach(img => {
    let img_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + img.name; //from multer to make name of pictures different
    let img_res = img.mv(path.join(__dirname, '../uploads/' + img_name)) //to uploads the pictures on uploads file
    // console.log(img_res)

    images.push(img_name)
  })

  const { deadline } = req.body;

  const currentDate = new Date();
  const status = currentDate > new Date(deadline) ? 'inactive' : 'active';


       
    let job = await Job.create({...req.body, created_by: req.user._id, images, status})
        res.send(job)
    } 
    
    catch (err) {
        next(err)
    }
}

const fetchSingleJOb = async (req, res, next)=>{

    try{
   
        let job = await Job.findById(req.params.id).populate("created_by", "name email")
        
        if(job){
            res.send(job)
        }
        else
        {
            res.status(404).send({
                msg:"Resource not found"
            })
        }

    }
    catch(err){
      next(err)
    }
}

module.exports = {
    createJob,
    get,
    fetchSingleJOb,
    getPostedjobs
}
