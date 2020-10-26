const router = require('express').Router();
const jobListController = require('../controller/JobListController')

router.get('/', jobListController.index)

module.exports = router;