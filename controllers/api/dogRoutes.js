const router = require('express').Router();
const { Dog } = require('../../models');



// CREATE new dog
router.post('/', async (req, res) => {
    try {
        let user_id = req.session.userId;
      const dbDogData = await Dog.create({
        id: req.body.dog.id,
        name: req.body.dog.name,
        breed1: req.body.dog.breed1,
        breed2: req.body.dog.breed2,
        gender: req.body.dog.gender,
        photo_url: req.body.dog.photo_url,
        adoptable: req.body.dog.adoptable,
        distance: req.body.dog.distance,
        adopt_url: req.body.dog.adopt_url,
        user_id: user_id,
      });
  
      res.status(200).json(dbDogData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log("in delete " + req.params.id);
      const response = await (await Dog.findByPk(req.params.id)).destroy();
      res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

module.exports = router;
