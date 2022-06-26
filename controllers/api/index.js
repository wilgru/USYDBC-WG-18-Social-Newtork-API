const router = require('express').Router();
const userRoutes = require('./UserController');
const thoughtRoutes = require('./ThoughtController');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
