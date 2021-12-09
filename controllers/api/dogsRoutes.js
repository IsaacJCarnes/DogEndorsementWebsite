const router = require('express').Router();
const https = require('https');

const getBreedList = async() => {
    let url = 'https://dog.ceo/api/breeds/list/all';
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}
/*function getBreedList(){
    let https = require('https');
    let url = 'https://dog.ceo/api/breeds/list/all';

    https.get(url, (response) => {
        body = '';
        response.on('data', function(chunk) {
            body += chunk
        });
        console.log(body);
        return body;
    });
};*/

router.get('/', async (req, res) => {
    try{
        let breedList = getBreedList();
        res.json(breedList);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;