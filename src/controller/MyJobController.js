const uuid = require('uuid')

const JobPosition = require('../models/job-position')
const Job = require('../models/job')
const Company = require('../models/company')
const TechJob = require('../models/techjob');
const Province = require('../models/province')
const Technology = require('../models/technology')
const {getTechJob , getDistanceTime} = require('../helpers/helper')

class MyJobController {
    index = (req, res) => {
        const jobPositionPromise = new Promise((resolve, reject) => {
            JobPosition.getAllJobPosition((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })

        const jobsPromise = new Promise((resolve, reject) => {
            const companyId = req.session.user.companyId;
            Job.getAllMyJobInfoByCompanyId(companyId, (err, data) => {
                if (err) {
                    reject(err)
                };
                resolve(data)
            })
        })

        const imgCompanyPromise = new Promise((resolve, reject) => {
            const companyId = req.session.user.companyId;
            Company.getImgById(companyId, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    
        const techJobPromise = new Promise((resolve, reject) => {
            TechJob.getTechJob((err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
        const provinceJobPromise = new Promise((resolve, reject) => {
            Province.getProvinceByCompanyId(req.session.user.companyId, (err, data) => {
                if(err) reject(err);
                resolve(data)
            })
        })
        const technologyPromise = new Promise((resolve, reject) => {
            Technology.getAllTech((err, data) => {
                if(err) reject(err)
                resolve(data)
            })
        })

        Promise.all([jobPositionPromise, jobsPromise, imgCompanyPromise, techJobPromise, provinceJobPromise, technologyPromise])
            .then(result => {
                const [jobPositionData, jobData, imgJobData, , provinceJobData, techsData] = result;
                const techJobData = getTechJob(jobData, result[3]);
                
                
                jobData.map(e => {
                    const distanceTime = getDistanceTime(e.update_time);
                    return Object.assign(e, {distanceTime : distanceTime})
                })
                //console.log(jobData, imgJobData, result[3], techJobData)
                
                res.render('company/myjob', {
                    user: req.session.user,
                    jobPositionData,
                    jobData,
                    imgJobData,
                    techJobData,
                    provinceJobData,
                    techsData,
                });
            }).catch(err => {
                return res.status(500).json({
                    err: err
                })
            })
    }
    createJob(req, res){
        const body = req.body;
        console.log(body)
        Job.insertJob(body, req.session.user.companyId, (err, result) => {
            if(err) res.status(500).json({ err: err })
            Job.getJobIdLast((err, data) => {
                if(err) res.status(500).json({ err: err })
                const jobId = data[0].job_id;
                TechJob.insertTechJob(jobId, body.tech, (err, data) => {
                    if(err) res.status(500).json({ err: err })
                    res.redirect('/my-job')
                })
            })
        })
        
    }
    getEditMyJob(req, res){
        const id = req.params.id;
        Promise.all([
            new Promise((resolve, reject) => {
                Job.getJobById(id, (err, data) => {
                    if(err) reject(err)
                    resolve(data);
                })
            }),
            new Promise((resolve, reject) => {
                JobPosition.getAllJobPosition((err, data) => {
                    if(err) reject(err)
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
                Technology.getAllTech((err, data) => {
                    if(err) reject(err);
                    resolve(data)
                })
            })
        ]).then(result => {
            const jobData = result[0][0];
            const [ ,jobPositionData, techJobData, techsData] = result;

            res.render('company/editmyjob',{
                user: req.session.user,
                jobData,
                jobPositionData,
                techJobData,
                techsData
            })
        }).catch(err => {
            return res.status(500).json({err: err})
        })
    }
    postEditMyJob(req, res){
        const body = req.body;
        const id = req.params.id;
        console.log(body)
        Job.updateJobById(id, {... body}, (err, data) => {
            if(err) return res.status(500).json({err: err});
            TechJob.deleteTechJobByJobId(id, (err, data) => {
                if(err) return res.status(500).json({err: err});
                TechJob.insertTechJob(id, body.tech, (err, data) => {
                    if(err) return res.status(500).json({err: err});
                    res.redirect(`/my-job`)
                })
            })
        })
          
        
    }
    deleteMyJob(req, res){
        const id = req.params.id;
        new Promise((resolve, reject) => {
            Job.deleteJobById(id, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        }).then(result => {
            res.redirect('/my-job');
        }).catch(err => {
            return res.status(500).json({ err: err })
        })
    }
}

module.exports = new MyJobController;