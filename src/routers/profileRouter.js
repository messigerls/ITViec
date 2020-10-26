const router = require('express').Router();
const profileController = require('../controller/ProfileController')


router.get('/', profileController.index)
router.post('/candidate', profileController.candidatePostData)

module.exports = router;