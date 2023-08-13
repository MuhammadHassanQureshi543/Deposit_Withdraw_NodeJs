const { Router } = require('express');
const express = require('express');
const router= express.Router();
const userController = require('../controller/userController')

// router.route('/test').get(userController.test)
router.route('/creatuser').post(userController.creatUser)
router.route('/loginUser').post(userController.loginUser)
router.route('/deposit').post(userController.depositrequest)
router.route('/withdraw').post(userController.withdraw)
module.exports = router