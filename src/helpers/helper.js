function getTechJob(jobData, techJobData){
    const jobIdArr = [...jobData].map(e => e.job_id);
    const techJob = [...jobIdArr].map(techJob => {
        let jobTechArr = [];
        techJobData.map(techJ => {
            if(techJ.job_id === techJob){
                jobTechArr.push({
                    technology_id : techJ.technology_id,
                    technology_name : techJ.technology_name,
                })
            }
        })
        return {
            job_id : techJob,
            technology_arr : jobTechArr,
        }
    })
    return techJob;
}

function getDistanceTime(time){

    const distanceTime = Date.now() - Date.parse(new Date(`${time}`));
    
    if(distanceTime < 60000) 
        return `${Math.floor(distanceTime / 1000)} giây trước`;
    if(distanceTime < 3600000) 
        return `${Math.floor(distanceTime / 60000)} phút trước`;
    if(distanceTime < 3600 * 24 * 1000) 
        return `${Math.floor(distanceTime / 3600000)} giờ trước`;
    return `${Math.floor(distanceTime / (3600 * 24 * 1000))} ngày trước`;
}


module.exports = { getTechJob , getDistanceTime  }