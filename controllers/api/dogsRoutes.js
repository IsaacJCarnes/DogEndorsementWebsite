const router = require('express').Router();
const https = require('https');

const getBreedList = () => {
    return new Promise((resolve, reject) => {
        let url = 'https://dog.ceo/api/breeds/list/all';
        https.get(url, (resp) => {
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
    });
};

router.get('/', async (req, res) => {
    try{
        let breedList = await getBreedList();
        res.json(breedList);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;