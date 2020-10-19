const router = require('express').Router();
const defaultController = require('../controller/DefaultController')

router.get('/', defaultController.index);

module.exports = router;