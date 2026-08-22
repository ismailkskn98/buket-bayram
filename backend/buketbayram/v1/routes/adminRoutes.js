const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/status', adminController.getStatus);

module.exports = router;
