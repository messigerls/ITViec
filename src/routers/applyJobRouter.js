const router = require('express').Router();
const applyJobController = require('../controller/ApplyJobController')

router.get('/', applyJobController.index)
router.get('/delete/:id', applyJobController.deleteApplyJob)
module.exports = router;