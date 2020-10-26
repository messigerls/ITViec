const router = require('express').Router();
const defaultController = require('../controller/DefaultController')
const {authLogout} = require('../middleware/authentication')

router.get('/logout', defaultController.logout);
router.get('/', defaultController.index);

module.exports = router;