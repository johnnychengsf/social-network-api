const router = require('express').Router();
//const testRoutes = require('./testRoutes');
//const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//router.use('/tests', testRoutes);
//router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
