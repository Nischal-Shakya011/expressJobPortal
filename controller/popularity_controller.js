// const Job = require('../model/Job');

// const popularityBasedRecommendation = async () => {
//   try {
//     // Fetch all jobs from the database
//     const allJobs = await Job.find();

//     // Sort jobs by popularity (e.g., number of applications, views, etc.)
//     // const popularJobs = allJobs.sort((a, b) => b.popularityMetric - a.popularityMetric).slice(0, 10);
//     const popularJobs = allJobs.sort((a, b) => b.numApplications - a.numApplications).slice(0, 2);

//     return popularJobs;
//   } catch (err) {

//     next(err);
//   }
// };
// try {
//     // Fetch popular jobs based on the number of applications
//     const popularJobs = await popularityRecommendation();

//     // Return the recommended popular jobs as a response
//     res.status(200).json({ popularJobs });


// // Function to calculate popularity-based job recommendations
// const popularityRecommendation = async () => {

//     // Fetch all jobs from the database
//     const allJobs = await Job.find();

//     // Sort jobs by the number of applications
//     const popularJobs = allJobs
//         .sort((a, b) => b.numApplications - a.numApplications)
//         .slice(0, 2);

//     return popularJobs;
//   }
// }
// catch (err) {
//     console.log(err);
// next(err)
// }

// }
// module.exports={
//     popularityBasedRecommendation
// }
const Job = require('../model/Job');

const popularityBasedRecommendation = async (req, res, next) => {
  try {
    // Fetch popular jobs based on the number of applications
    const popularJobs = await popularityRecommendation();

    // Return the recommended popular jobs as a response
    res.status(200).json({ popularJobs });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Function to calculate popularity-based job recommendations
const popularityRecommendation = async () => {
  try {
    // Fetch all jobs from the database
    const allJobs = await Job.find();

    // Sort jobs by the number of applications
    const popularJobs = allJobs
      .sort((a, b) => b.numApplications - a.numApplications)
      .slice(0, 3);

    return popularJobs;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  popularityBasedRecommendation,
};