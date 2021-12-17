const https = require('https');
require('dotenv').config();

module.exports = {
    deconstructArray: (dogArray) => {
        let dog = {
            id: dogArray.id,
            name: dogArray.name,
            breed1: dogArray.breeds.primary,
            breed2: dogArray.breeds.secondary,
            gender: dogArray.gender,
            //photo_url: dogArray.photos[0].small,
            description: dogArray.description,
            adoptable: dogArray.status,
            distance: dogArray.distance,
            //address: dogArray.address.address1,
            adopt_url: dogArray.url,
        };
    
        if(dogArray.photos[0]){
            dog.photo_url = dogArray.photos[0].medium;
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
    },

getBreedsList: async (token) => {
    return await new Promise(async (resolve, reject) => {
        var url = 'https://api.petfinder.com/v2/types/dog/breeds';
        console.log(token);
        var https_options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token.access_token}`
            }
        }
        console.log("how");
        const request = https.request(url, https_options, (resp) => {
          console.log("dee");
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              request.end();
              resolve(JSON.parse(data));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            request.end();
            reject(err);
        });
    });
},

tokenAuth : () => {
    return new Promise(async (resolve, reject) => {
        var url = 'https://api.petfinder.com/v2/oauth2/token'
        var id = process.env.API_ID;
        var secret = process.env.API_SECRET;

        var https_options = {
            method: 'POST',
        }
        let chunk = JSON.stringify({
            'grant_type': 'client_credentials',
            'client_id': id,
            'client_secret': secret,
        });
        const request = await https.request(url, https_options, async (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', async (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', async () => {
                await resolve(data);
            });
        }).on("error", async (err) => {
            console.log("Error: " + err.message);
            await reject(err);
        });
        request.write(chunk, 'utf8');
        request.end();
    });
},

getDogsList : async (token, location, breed) => { //Location is based on zip code
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
},

getDogsFromLocation: async (token, location) =>{
    let dogList = await getDogsList(token, location, null);
    return dogList;
},

getDogsFromBreed: async (token, breed) =>{
    let dogList = await getDogsList(token, null, breed);
    return dogList;
},

}
  