const Job = require('../models/job')
const TechJob = require('../models/techjob');
const Apply = require('../models/apply')

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
           }),
           new Promise((resolve, reject) => {
                Apply.getCandidateApplyJob(id, (err, data) => {
                    if(err) reject(err);
                    resolve(data);
                })
           })
       ]).then(result => {
            const [ jobData, techJobData, applyData ] = result;
            let isApplied = false;
            if(req.session.user && req.session.user.candidateId && applyData.length > 0 && applyData.findIndex(e => e.candidate_id === req.session.user.candidateId) !== - 1){
                isApplied = true;
            }
            console.log(applyData, isApplied)
            res.render('guest/job', {
                user: req.session.user,
                jobData: jobData[0],
                techJobData,
                isApplied,
            })
        }).catch(err => {
            console.log(err)
             return res.status(500).json({ err: err })
        })
       
   }
}

module.exports = new JobController;