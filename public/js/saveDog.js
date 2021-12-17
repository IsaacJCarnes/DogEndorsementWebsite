const saveListDog = async (event) => {
    let dogId = event.target.previousElementSibling.value;
    let target = event.target.parentElement.parentElement.parentElement;
    event.preventDefault();
    let dog_adopt_url = target.childNodes[3].childNodes[3].childNodes[1].childNodes[0].href;
    let dog_photo_url = target.childNodes[1].childNodes[1].currentSrc;
    let dogName = target.childNodes[3].childNodes[1].childNodes[0].data.substring(6);
    let dataHolder = target.childNodes[5];
    let dogGender = dataHolder.childNodes[1].childNodes[0].data.substring(8);
    let dogBreed1 = dataHolder.childNodes[3].childNodes[3].innerText;
    let dogBreed2 = null;
    if(dataHolder.childNodes[3].childNodes[5].innerText){
      dogBreed2 = dataHolder.childNodes[3].childNodes[5].childNodes[0].nodeValue;
    }
    let dogAdoptable = dataHolder.childNodes[5].childNodes[0].data;
    let dogDistance = dataHolder.childNodes[7].childNodes[0].data;
    dogDistance = dogDistance.substring(0, dogDistance.length-11);

    let dog = {
      id: dogId,
      name: dogName,
      breed1: dogBreed1,
      breed2: dogBreed2,
      gender: dogGender,
      photo_url: dog_photo_url,
      adoptable: dogAdoptable,
      distance: dogDistance,
      adopt_url: dog_adopt_url,
    }
    //const breed = document.querySelector("#breeds").value.trim();
    /*if (zipcode && breed) {
      let url = '/search' + '/' + zipcode + '/' + breed;
      document.location.replace(url);
    } else if (zipcode) {
      let url = '/search' + '/' + zipcode + '/' + noBreed;
      document.location.replace(url);
    }*/

    const response = await fetch('/api/dogs', {
      method: 'POST',
      body: JSON.stringify({ dog }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
    } else {
      alert('Failed to save dog');
    }
  };
  
  document
    .addEventListener('click', (event) => {
        if(event.target.matches('[type="button"]')){
            saveListDog(event);
        }
    });
  