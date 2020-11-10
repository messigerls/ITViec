const Apply = require("../models/apply");
const {getDistanceTime} = require('../helpers/helper')
class ApplyJobController {

    index(req, res) {
        new Promise((resolve, reject) => {
            const id = req.session.user.candidateId;
            Apply.getApplyByCandidateId(id, (err, data) => {
                console.log(err)
                if(err) reject(err)
                resolve(data)
            })
        }).then(result => {
            const pendingJobData = result.filter(e => e.receivedTime === null).map(e => {
                return Object.assign(e, {distanceApplyTime : getDistanceTime(e.applyTime)})
            });
            const approvedJobData = result.filter(e => e.receivedTime !== null).map(e => {
                return Object.assign(e, {distanceApplyTime : getDistanceTime(e.applyTime)})
            });
            console.log(pendingJobData, approvedJobData)
            res.render("candidate/applyjob.ejs", {
                user: req.session.user,
                pendingJobData,
                approvedJobData
            });
        }).catch(err => res.status(500).json({ err: err }))
        
    }

    applyJob(req, res){
        const { jobId } = req.params;
        const {candidateId} = req.session.user;
        Apply.insertApplyJob(jobId, candidateId, (err, result) => {
            if(err) return res.status(500).json({ err: err })
            res.redirect('/apply-job')
        })
    }
    cancelApplyJob(req, res){
        const { jobId } = req.params;
        Apply.cancelApplyJob(jobId, req.session.user.candidateId, (err, result) => {
            if(err) return res.status(500).json({ err: err });
            res.redirect('/apply-job');
        })
    }
    deleteApplyJob(req, res){
        const { id } = req.params;
        Apply.deleteApplyJob(id, (err, data) => {
            if(err) return res.status(500).json({ err: err });
            res.redirect('/apply-job')
        })
    }
}

module.exports = new ApplyJobController();
