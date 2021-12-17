const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dogRoutes = require('./dogRoutes');

router.use('/users', userRoutes);
router.use('/dogs', dogRoutes);

module.exports = router;
