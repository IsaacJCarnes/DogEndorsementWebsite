const removeDog = async (event) => {
    let dogId = event.target.previousElementSibling.value;
    event.preventDefault();
    
    //const breed = document.querySelector("#breeds").value.trim();
    /*if (zipcode && breed) {
      let url = '/search' + '/' + zipcode + '/' + breed;
      document.location.replace(url);
    } else if (zipcode) {
      let url = '/search' + '/' + zipcode + '/' + noBreed;
      document.location.replace(url);
    }*/
    console.log(dogId);
    let url = '/api/dogs/' + dogId;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to save dog');
    }
  };
  
  document
    .addEventListener('click', (event) => {
        if(event.target.matches('[type="button"]')){
            removeDog(event);
        }
    });
  