const { uploadFile } = require("../helpers/cloud");
const Candidate = require('../models/candidate')
const Account = require('../models/account')
const JobPosition = require('../models/job-position')
const Province = require('../models/province')
const Company = require('../models/company')
const TechCompany = require('../models/techcompany')
const Technology = require('../models/technology')

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
                Object.assign(candidateData, {birthDay: new Date(Number.parseInt(new Date(candidateData.dob).getTime()) + 1000 * 3600 * 24)})
                console.log(candidateData)
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
            const companyId = req.session.user.companyId;
            Promise.all([
                new Promise((resolve, reject) => {
                    Company.getCompanyInfoById(companyId, (err, data) => {
                        if(err) reject(err);
                        resolve(data[0]);
                    })
                }),
                new Promise((resolve, reject) => {
                    Province.getAllProvince((err, data) => {    
                        if(err) reject(err)
                        resolve(data);
                    })
                }),
                new Promise((resolve, reject) => {
                    Account.getEmailAndPhoneById(req.session.user.userId, (err, data) => {
                        if(err) reject(err)
                        resolve(data)
                    })
                }),
                new Promise((resolve, reject) => {
                    const companyId = req.session.user.companyId;
                    TechCompany.getTechByCompanyId(companyId, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    })
                }),
                new Promise((resolve, reject) => {
                    Technology.getAllTech((err, data) => {
                        if(err) reject(err)
                        resolve(data);
                    })
                })

            ]).then(result => {
                const [companyData, provinceData, accountData, techData, techsData] = result;
                console.log(companyData)
                res.render("share/profile", {
                    user: req.session.user,
                    companyData,
                    provinceData,
                    accountData,
                    techData,
                    techsData,
                });

            }).catch(err => res.status(500).json({ err: err }))
            
        }
    };
    candidatePostData = (req, res) => {
        const file = req.file;
        const body = req.body;
        const candidateId = req.session.user.candidateId;
        console.log(file, body)
        if(file){
            uploadFile(file.path).then(result => {
                console.log(result);
                const cv = result.url;
                Candidate.updateCandidate(body, cv, candidateId, (err, data) => {
                    if(err) return res.status(500).json({ err: err })
                    res.redirect('/profile');
                })
            }).catch(err => res.status(500).json({ err: err }))
        }else{
            Candidate.updateCandidate(body, null, candidateId, (err, data) => {
                if(err) return res.status(500).json({ err: err })
                res.redirect('/profile');
            })
        }
        
    };
    companyPostData(req, res){
        const files = req.files;
        const body = req.body;
        console.log(files)
        if(files.length === 2){
            Promise.all([
                uploadFile(files[0].path),
                uploadFile(files[1].path),
            ]).then(result => {
                const urlCover = result[0].url;
                const urlLogo = result[1].url;
                Company.updateCompany(body, req.session.user.companyId, urlCover, urlLogo, (err, data) => {
                    
                    if(err) return res.status(500).json({ errCompany: err })
                    TechCompany.deleteTechByCompanyId(req.session.user.companyId, (err, data) => {
                        TechCompany.insertTechByCompanyId(body.tech, req.session.user.companyId, (err, data) => {
                            
                            if(err) return res.status(500).json({ errTech: err })
                            res.redirect('/profile');
                        })
                    })
                })
                
            }).catch(err => res.status(500).json({ err: err }))
        }
        if(files.length === 1){
            uploadFile(files[0].path)
                .then(result => {
                    let urlCover, urlLogo = null;
                    if(files[0].fieldname == 'companyLogo'){
                        urlLogo = result.url;
                    }
                    if(files[0].fieldname == 'companyCover'){
                        urlCover = result.url;
                    }
                    Company.updateCompany(body, req.session.user.companyId, urlCover, urlLogo, (err, data) => {
                    
                        if(err) return res.status(500).json({ errCompany: err })
                        TechCompany.deleteTechByCompanyId(req.session.user.companyId, (err, data) => {
                            TechCompany.insertTechByCompanyId(body.tech, req.session.user.companyId, (err, data) => {
                                
                                if(err) return res.status(500).json({ errTech: err })
                                res.redirect('/profile');
                            })
                        })
                    })
                }).catch(err => res.status(500).json({ err: err }))
        }
        if(files.length === 0){
            Company.updateCompany(body, req.session.user.companyId, null, null, (err, data) => {
                if(err) return res.status(500).json({ errCompany: err })
                TechCompany.deleteTechByCompanyId(req.session.user.companyId, (err, data) => {
                    TechCompany.insertTechByCompanyId(body.tech, req.session.user.companyId, (err, data) => {
                        if(err) return res.status(500).json({ errTech: err })
                        res.redirect('/profile');
                    })
                })
            })
        }
        
    }
}
module.exports = new ProfileController();
