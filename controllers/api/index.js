const router = require('express').Router();
const userRoutes = require('./UserController');
const thoughtRoutes = require('./ThoughtController');

router.use('/user', userRoutes);
router.use('/thougt', thoughtRoutes);

module.exports = router;
