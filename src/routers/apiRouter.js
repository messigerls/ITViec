const router = require('express').Router();
const apiController = require('../controller/ApiController');

router.get('/job-list(/:city/:search)?', apiController.renderJobList)
router.get('/job-list(/:city)?', apiController.renderJobList)
router.delete('/delete-apply-job/:id', apiController.deleteApplyJob)





module.exports = router;