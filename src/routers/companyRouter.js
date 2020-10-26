const router = require('express').Router();
const companyRouter = require('../controller/CompanyController')

router.get('/:id', companyRouter.getCompanyById)
router.get('/', companyRouter.index)


module.exports = router;