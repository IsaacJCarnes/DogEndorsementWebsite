const router = require('express').Router();
const https = require('https');

//const fetch = require("node-fetch");


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
                console.log(data);
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

router.get('/', async (req, res) => {
    try{
        let token = await getToken();
        res.json(token);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;