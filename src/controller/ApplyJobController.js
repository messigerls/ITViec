const Apply = require("../models/apply");

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
            const pendingJobData = result.filter(e => e.receivedTime === null)
            const approvedJobData = result.filter(e => e.receivedTime !== null)
            console.log(pendingJobData, approvedJobData)
            res.render("candidate/applyjob.ejs", {
                user: req.session.user,
                pendingJobData,
                approvedJobData
            });
        }).catch(err => res.status(500).json({ err: err }))
        
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
