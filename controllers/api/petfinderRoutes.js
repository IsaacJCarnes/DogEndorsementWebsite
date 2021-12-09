//bdQfKZtELZCIkwT9oFyeHWcnFNopLlJviUACXCaFPiK5ynBPIW
//shVnvnU2ZtPaUcIEAsW6YYpmvykYapVcej1M51GM
const router = require('express').Router();
const https = require('https');

//const fetch = require("node-fetch");


const getToken= async () => {
    var url = 'https://api.petfinder.com/v2/oauth2/token'
    var id = 'bdQfKZtELZCIkwT9oFyeHWcnFNopLlJviUACXCaFPiK5ynBPIW';
    var secret = 'shVnvnU2ZtPaUcIEAsW6YYpmvykYapVcej1M51GM';

    var https_options = {
        headers: {
        'grant_type': 'client_credentials',
        'client_id': id,
        'client_secret': secret,
        }
    }
    await https.get(url, https_options, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            return JSON.parse(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

router.get('/', async (req, res) => {
    try{
        let token = getToken();
        res.json(token);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;