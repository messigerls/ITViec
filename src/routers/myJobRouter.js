const router = require('express').Router();
const myJobController = require('../controller/MyJobController')

router.post('/:id/edit', myJobController.postEditMyJob)
router.get('/:id/delete', myJobController.deleteMyJob)
router.get('/:id/edit', myJobController.getEditMyJob)
router.post('/', myJobController.createJob)
router.get('/', myJobController.index)


module.exports = router;