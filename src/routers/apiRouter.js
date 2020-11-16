const router = require('express').Router();
const apiController = require('../controller/ApiController');

// router.get('/job-list(/:city/:search)?', apiController.renderJobList)
// router.get('/job-list(/:city)?', apiController.renderJobList)
router.get('/account/accountIdLast' ,apiController.getAccountIdLast)
router.delete('/delete-apply-job/:id', apiController.deleteApplyJob)
// router.get('/job/insert/:row', apiController.insertJobRow)
router.get('/job-list/:city/:search', apiController.getJobList);
router.get('/job-list/:city', apiController.getJobListByCity);





module.exports = router;