const router = require('express').Router();
var pet_controller = require('../controllers/api/petfinderRoutes');
const { Dog } = require('../models');
let petToken = null;

const fillToken = async () => {
    if(petToken == null){
        petToken = await pet_controller.get('/');
        console.log(petToken);
    }
};

router.get('/searchData', async (req, res) => {
    fillToken();
    try {
      const dogData = await pet_controller.get('/doglist/15206');
      const dogs = dogData.map((project) => project.get({ plain: true }));
  
      res.render('searchList', {
        dogs,
        layout: 'result',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
