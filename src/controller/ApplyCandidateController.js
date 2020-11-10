const Apply = require('../models/apply');
const { getDistanceTime } = require('../helpers/helper')
class ApplyCandidateController{
    index(req, res){
        Apply.getCandidateInfo(req.session.user.companyId, (err, data) => {
            if(err) return res.status(500).json({ err: err })
            const pendingApplyData = data.filter(e => e.receivedTime === null).map(e => {
                return Object.assign(e, {distanceApplyTime : getDistanceTime(e.applyTime)})
            });
            const receivedApplyData = data.filter(e => e.receivedTime !== null).map(e => {
                return Object.assign(e, {distanceReceivedTime : getDistanceTime(e.receivedTime)})
            });
            console.log(pendingApplyData, receivedApplyData)
            res.render('company/applycandidate', {
                user: req.session.user,
                pendingApplyData,
                receivedApplyData
            })
        })
        
    }
    deleteApplyJob(req, res){
        const { id } = req.params;
        Apply.deleteApplyJob(id, (err, result) => {
            if(err) return res.status(500).json({ err: err })
            res.redirect('/apply-candidate')
        })
    }
    modifyApplyJob(req, res){
        const { id } = req.params;
        Apply.receivedApplyJob(id, (err, result) => {
            if(err) return res.status(500).json({ err: err })
            res.redirect('/apply-candidate')
        })
    }
}

module.exports = new ApplyCandidateController;