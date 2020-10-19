const router = require('express').Router();
const { authLogin } = require('../middleware/authentication')
const registerController = require('../controller/RegisterController');

router.get('/', authLogin, registerController.getRegister);
router.post('/', registerController.postRegister);


module.exports = router;