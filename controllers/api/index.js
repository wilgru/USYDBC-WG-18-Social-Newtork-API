const router = require('express').Router();
const userRoutes = require('./userController');
const thoughtRoutes = require('./thoughtController');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
