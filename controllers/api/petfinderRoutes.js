const router = require('express').Router();
const https = require('https');
const { url } = require('inspector');
const { cachedDataVersionTag } = require('v8');
const { Dog } = require('../../models');

const deconstructArray = (dogArray) => {
    let dog = {
        id: dogArray.id,
        name: dogArray.name,
        breed: dogArray.breeds.primary,
        gender: dogArray.gender,
        //photo_url: dogArray.photos[0].small,
        description: dogArray.description,
        adoptable: dogArray.adoptable,
        distance: dogArray.distance,
        //address: dogArray.address.address1,
        adopt_url: dogArray.url,
    };

    if(dogArray.photos[0]){
        dog.photo_url = dogArray.photos[0].small;
    } else {
        dog.photo_url = null;
    }

    if(dogArray.contact.address){
        dog.address1 = dogArray.contact.address.address1;
        dog.address2 = dogArray.contact.address.address2;
        dog.city = dogArray.contact.address.city;
        dog.state = dogArray.contact.address.state;
        dog.zipcode = dogArray.contact.address.postcode;
    } else {
        dog.address = null;
        dog.address1 = null;
        dog.address2 = null;
        dog.city = null;
        dog.state = null;
        dog.zipcode = null;
    }

    return dog;
};


const getToken= () => {
    return new Promise((resolve, reject) => {
        var url = 'https://api.petfinder.com/v2/oauth2/token'
        var id = 'bdQfKZtELZCIkwT9oFyeHWcnFNopLlJviUACXCaFPiK5ynBPIW';
        var secret = 'shVnvnU2ZtPaUcIEAsW6YYpmvykYapVcej1M51GM';

        var https_options = {
            method: 'POST',
        }
        let chunk = JSON.stringify({
            'grant_type': 'client_credentials',
            'client_id': id,
            'client_secret': secret,
        });
        const request = https.request(url, https_options, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
        request.write(chunk, 'utf8');
        request.end();
    });
}

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

const getDogsFromLocation = async (token, location) =>{
    let dogList = await getDogsList(token, location, null);
    return dogList;
}

const getDogsFromBreed = async (token, breed) =>{
    let dogList = await getDogsList(token, null, breed);
    return dogList;
}

router.get('/', async (req, res) => {
    try{
        let token = JSON.parse(await getToken());
        if(token.access_token != null){
            let dogList = await getDogsFromLocation(token, "15206");
            //let printout = JSON.stringify(deconstructArray(dogList.animals[0])) +" |||| "+ JSON.stringify(dogList.animals[0]);
            //res.json(printout);
            res.json(deconstructArray(dogList.animals[0]));
        } else {
            res.json(token);
        }
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;