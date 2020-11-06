const router = require('express').Router();
const applyCandidateController = require('../controller/ApplyCandidateController');

router.get('/modify/:id', applyCandidateController.modifyApplyJob)
router.get('/delete/:id', applyCandidateController.deleteApplyJob)
router.get('/', applyCandidateController.index)

module.exports = router;