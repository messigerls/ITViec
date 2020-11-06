const router = require('express').Router();
const profileController = require('../controller/ProfileController')
const { multerImg } = require('../middleware/multer')

router.get('/', profileController.index)
router.post('/candidate', multerImg.single('cv'), profileController.candidatePostData)

module.exports = router;