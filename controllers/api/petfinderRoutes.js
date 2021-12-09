//bdQfKZtELZCIkwT9oFyeHWcnFNopLlJviUACXCaFPiK5ynBPIW
//shVnvnU2ZtPaUcIEAsW6YYpmvykYapVcej1M51GM
const router = require('express').Router();

//const fetch = require("node-fetch");


/*function getToken(){
    var url = 'https://api.petfinder.com/v2/oauth2/token'
    var id = 'bdQfKZtELZCIkwT9oFyeHWcnFNopLlJviUACXCaFPiK5ynBPIW';
    var secret = 'shVnvnU2ZtPaUcIEAsW6YYpmvykYapVcej1M51GM';

    fetch(url, { 
    method: 'post', 
    headers: new Headers({
        'grant_type': 'client_credentials',
        'client_id': id,
        'client_secret': secret,
    }), 
  }).then((response) => {
      console.log(response);
      return response;
  });
}

router.get('/', async (req, res) => {
    try{
        let token = getToken();
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});
*/
module.exports = router;