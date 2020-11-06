const Job = require('../models/job')
const TechJob = require('../models/techjob');

class JobController{
   index(req, res){
       const { id } = req.params;
       Promise.all([
           new Promise((resolve, reject) => {
                Job.getJobAndCompanyInfo(id, (err, data) => {
                  
                    if(err) reject(err);
                    resolve(data)
                })
           }),
           new Promise((resolve, reject) => {
                TechJob.getTechJobByJobId(id, (err, data) => {
                    if(err) reject(err);
                    resolve(data)
                })
           })
       ]).then(result => {
            const [ jobData, techJobData ] = result;
            
            res.render('guest/job', {
                user: req.session.user,
                jobData: jobData[0],
                techJobData,
            })
        }).catch(err => {
             return res.status(500).json({ err: err })
        })
       
   }
}

module.exports = new JobController;