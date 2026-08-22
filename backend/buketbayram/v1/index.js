const express = require('express');

const verifyToken = require('./middlewares/verifyToken');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');

const router = express.Router();

router.use('/public', publicRoutes);
router.use(verifyToken);
router.use('/admin', adminRoutes);

module.exports = router;
