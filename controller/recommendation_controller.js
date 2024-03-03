const Job = require('../model/Job')
const Profile = require('../model/Profile')

let recommendation = async(req, res, next)=>{
    try{

    const userId = req.params.id;
    
    // Fetch profile profile from the database
    const profile = await Profile.findOne({created_by: userId});
    if (!profile) {
      return res.status(404).json({ message: 'profile not found' });
    }

    // Fetch all jobs from the database
    const allJobs = await Job.find();

    // Calculate job recommendations
    const jobRecommendations = calculateJobRecommendations(profile, allJobs);

    res.json({ recommendations: jobRecommendations });
 

// Function to calculate job recommendations
function calculateJobRecommendations(profile, allJobs) {
  // Simplified content representation and similarity calculation
  const profilePreferences = getprofilePreferences(profile);

  const jobRecommendations = allJobs.map(job => {
    const jobFeatures = getJobFeatures(job);
    const similarity = calculateCosineSimilarity(profilePreferences, jobFeatures);
    return { job, similarity };
  });

  // Sort jobs by similarity and recommend the top 3
  const topNJobs = jobRecommendations
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 6)
    .map(item => item.job);

  return topNJobs;
}

// Helper function to extract profile preferences
function getprofilePreferences(profile) {
  // For simplicity, assuming profile preferences are based on job category and job level
  return {
    category: profile.prefered_job || '',
    // jobLevel: profile.preferredJobLevel || '',
  };
}

// Helper function to extract job features
function getJobFeatures(job) {
  // For simplicity, using job category and job level as features
  return {
    category: job.categories[0] || '',
    // jobLevel: job.jobLevel || '',
  };
}

// Helper function to calculate cosine similarity
function calculateCosineSimilarity(vector1, vector2) {
  // Simplified cosine similarity calculation
  // You might want to implement a more robust solution based on your data
//   const dotProduct = vector1.category === vector2.category && vector1.jobLevel === vector2.jobLevel ? 1 : 0;
//   const magnitude1 = Math.sqrt(vector1.category.length + vector1.jobLevel.length);
//   const magnitude2 = Math.sqrt(vector2.category.length + vector2.jobLevel.length);

  const dotProduct = vector1.category === vector2.category ? 1 : 0;
  const magnitude1 = Math.sqrt(vector1.category.length );
  const magnitude2 = Math.sqrt(vector2.category.length);

  return dotProduct / (magnitude1 * magnitude2);
}
    }
    catch (err){
     next(err)
    }

}
module.exports = {
    recommendation
} 


