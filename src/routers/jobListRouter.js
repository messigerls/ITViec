const router = require('express').Router();
const jobListController = require('../controller/JobListController')

router.get('/:city/:search', jobListController.renderSearch)
router.get('/:city', jobListController.renderCitySearch)
router.get('/', jobListController.index)

module.exports = router;