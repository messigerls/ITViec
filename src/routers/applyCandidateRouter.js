const router = require('express').Router();
const applyCandidateController = require('../controller/ApplyCandidateController');
const {authUser, authCompany} = require('../middleware/authentication')

router.get('/modify/:id', applyCandidateController.modifyApplyJob)
router.get('/delete/:id', applyCandidateController.deleteApplyJob)
router.get('/', applyCandidateController.index)


module.exports = router;