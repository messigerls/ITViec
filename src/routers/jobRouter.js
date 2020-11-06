const router = require('express').Router();
const jobController = require('../controller/JobController')

router.get('/:id', jobController.index)



module.exports = router;