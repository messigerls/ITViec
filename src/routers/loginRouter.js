const router = require('express').Router();
const { authLogin } = require('../middleware/authentication')
const loginController = require('../controller/LoginController')

router.get('/',authLogin, loginController.getLogin);
router.post('/', loginController.postLogin);

module.exports = router;