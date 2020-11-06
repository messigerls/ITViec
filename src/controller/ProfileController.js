const { uploadFile } = require("../helpers/cloud");
const Candidate = require('../models/candidate')
const Account = require('../models/account')
const JobPosition = require('../models/job-position')
const Province = require('../models/province')
class ProfileController {
    index = (req, res) => {
        const candidatePromise = new Promise((resolve, reject) => {
            Candidate.getCandidateById(req.session.user.userId, (err, result) => {
                if(err) reject(err);
                resolve(result[0]);
            })
        })
        const accountPromise = new Promise((resolve, reject) => {
            Account.getEmailAndPhoneById(req.session.user.userId, (err, result) => {
                if(err) reject(err);
                resolve(result[0]);
            })
        })
        const jobPositionPromise = new Promise((resolve, reject) => {
            JobPosition.getAllJobPosition((err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
        const provincePromise = new Promise((resolve, reject) => {
            Province.getAllProvince((err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
        
        
        if(req.session && req.session.user.role === 1){
            Promise.all([candidatePromise, accountPromise, jobPositionPromise, provincePromise])
            .then((result) => {
                const [candidateData, accountData, jobPositionData, provinceData] = result;
                console.log(candidateData, accountData)
                const candidate = { ...candidateData, ...accountData}
                res.render("share/profile", {
                    user: req.session.user,
                    candidate,
                    jobPositionData,
                    provinceData,
                });  
            }).catch(err => {
                return res.status(500).send({ err })
            })
            
        }
        if(req.session && req.session.user.role === 2){
            res.render("share/profile", {
                user: req.session.user,
            });
        }
    };
    candidatePostData = (req, res) => {
        const file = req.file;
        const body = req.body;

    };
}

module.exports = new ProfileController();
