const router = require('express').Router();
const petfinderRoutes = require('./petfinderRoutes');
const mapboxRoutes = require('./mapboxRoutes');

router.use('/petfinder', petfinderRoutes);
router.use('/mapbox', mapboxRoutes);

module.exports = router;
