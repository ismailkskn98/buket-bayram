const express = require('express');

const healthController = require('../controllers/healthController');
const publicRateLimit = require('../middlewares/publicRateLimit');

const router = express.Router();

router.get('/health', publicRateLimit, healthController.getHealth);

module.exports = router;
