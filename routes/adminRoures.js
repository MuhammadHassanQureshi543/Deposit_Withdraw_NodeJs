const { Router } = require('express');
const express = require('express');
const router= express.Router();
const adminController = require('../controller/adminController')

router.route('/deposit_accept').post(adminController.deposit_accept)
router.route('/withdraw_accept').post(adminController.withdraw_accept)

module.exports = router