const router = require('express').Router();
const applyJobController = require('../controller/ApplyJobController')


router.get('/apply/:jobId', applyJobController.applyJob)
router.get('/cancel-apply/:jobId', applyJobController.cancelApplyJob)
router.get('/delete/:id', applyJobController.deleteApplyJob)
router.get('/', applyJobController.index)


module.exports = router;