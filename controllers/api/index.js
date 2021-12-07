const router = require('express').Router();
const petfinderRoutes = require('./petfinderRoutes');
const dogsRoutes = require('./dogsRoutes');
const mapboxRoutes = require('./mapboxRoutes');

router.use('/petfinder', petfinderRoutes);
router.use('/dogs', dogsRoutes);
router.use('/mapbox', mapboxRoutes);

module.exports = router;
