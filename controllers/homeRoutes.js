const router = require('express').Router();
const https = require('https');
const { lazyrouter } = require('express/lib/application');
const { User, Dog } = require('../models');
const withAuth = require('../utils/auth');
const {tokenAuth, deconstructArray} = require('../utils/helpers');

const getDogsList = async (token, location, breed) => { //Location is based on zip code
  return new Promise((resolve, reject) => {
      var url = 'https://api.petfinder.com/v2/animals?type=dog';
      if(location){
          url = url + '&' + 'location=' +location;
      }
      if(breed){
          url = url + '&' + 'breed=' +breed;
      }

      var https_options = {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${token.access_token}`
          }
      }
      const request = https.request(url, https_options, (resp) => {
          let data = '';

          // A chunk of data has been received.
          resp.on('data', (chunk) => {
              data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              resolve(JSON.parse(data));
          });
      }).on("error", (err) => {
          console.log("Error: " + err.message);
          reject(err);
      });
      request.end();
  });
}

const getBreedsList = async (token) => {
  return new Promise((resolve, reject) => {
      var url = 'https://api.petfinder.com/v2/types/dog/breeds';

      var https_options = {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${token.access_token}`
          }
      }
      const request = https.request(url, https_options, (resp) => {
          let data = '';

          // A chunk of data has been received.
          resp.on('data', (chunk) => {
              data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              resolve(JSON.parse(data));
          });
      }).on("error", (err) => {
          console.log("Error: " + err.message);
          reject(err);
      });
      request.end();
  });
}

async function newToken(req) {
  return new Promise(async (resolve, reject) => {
    let tokenStuff = await tokenAuth();
    resolve(tokenStuff);      
  })
}

router.get('/', async (req, res) => {
  try {
    let myCurrentToken = req.session.petToken;
    let loggedIn = req.session.loggedIn;
    if(!myCurrentToken){
      let tokenStuff = await newToken(req);
      myCurrentToken = JSON.parse(tokenStuff);
      req.session.save(() => {
        req.session.petToken = myCurrentToken;
      });
    }
    let breedData = await getBreedsList(myCurrentToken);
    if(breedData.status == 401){ //If api key has timed out
      tokenStuff = await newToken(req);
      myCurrentToken = JSON.parse(tokenStuff);
      req.session.save(() => {
        req.session.petToken = myCurrentToken;
        
      });
      breedData = await getBreedsList(myCurrentToken);
    }
    let breeds = [];
    for(i = 0; i < breedData.breeds.length; i++){
      breeds.push(breedData.breeds[i].name);
    }
    res.render('prefrences', {
      breeds,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/:zipcode/:breed', async (req, res) => {
  try {
    let myCurrentToken = req.session.petToken;
    let loggedIn = req.session.loggedIn;
    if(!myCurrentToken){
      let tokenStuff = await newToken(req);
      myCurrentToken = JSON.parse(tokenStuff);
      req.session.save(() => {
        req.session.petToken = myCurrentToken;
      });
    }
    let dogList = "";
    /*let zipcode = req.params.zipcode.substring(1);//Gets rid of : in params
    let breed = req.params.breed.substring(1);*/
    let zipcode = req.params.zipcode;
    let breed = req.params.breed;
    if(breed != 'null' && zipcode){
      dogList = await getDogsList(myCurrentToken, zipcode, breed);
    } else if (zipcode){
      dogList = await getDogsList(myCurrentToken, zipcode, null);
    }
    
    let dogs = [];
    for(i = 0; i < dogList.animals.length; i++){
      dogs.push(deconstructArray(dogList.animals[i]));
    }
    dogs.sort((a, b) => a.distance - b.distance);
    res.render('searchList', {
      dogs,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('singup');
});

router.get('/saved', async (req, res) => {
  let loggedIn = req.session.loggedIn;
  let id = req.session.userId;
  if (!loggedIn) {
    res.redirect('/login');
    return;
  }
  let dbDogData = await Dog.findAll({
    where: {
      user_id: id,
    },
    raw: true,
  });
  let dogs = dbDogData;
  console.log(dbDogData);
  res.render('wishlist', {
    dogs,
    loggedIn,
  });
});

module.exports = router;
