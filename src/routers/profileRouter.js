const router = require('express').Router();
const profileController = require('../controller/ProfileController')
const { multerImg, multerPdf } = require('../middleware/multer')

router.get('/', profileController.index)
router.post('/candidate', multerPdf.single('cv'), profileController.candidatePostData)
router.post('/company', multerImg.any(), profileController.companyPostData)

module.exports = router;