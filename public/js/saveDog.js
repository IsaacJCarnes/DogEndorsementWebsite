const saveListDog = async (event) => {
    let dogId = event.target.previousElementSibling.value;
    let target = event.target.parentElement.parentElement.parentElement;
    event.preventDefault();
    let adopt_url = target.childNodes[3].childNodes[3].childNodes[1].childNodes[0].href;
    let photo_url = target.childNodes[1].childNodes[1].currentSrc;
    let name = target.childNodes[3].childNodes[1].childNodes[0].data.substring(6);
    let dataHolder = target.childNodes[5];
    let gender = dataHolder.childNodes[1].childNodes[0].data.substring(8);
    let breed1 = dataHolder.childNodes[3].childNodes[3].childNodes[0].nodeValue;
    let breed2 = dataHolder.childNodes[3].childNodes[5].childNodes[0].nodeValue;
    let adoptable = dataHolder.childNodes[5].childNodes[0].data;
    let distance = dataHolder.childNodes[7].childNodes[0].data;
    distance = distance.substring(0, distance.length-11);

    //const breed = document.querySelector("#breeds").value.trim();
    let noBreed = null;
    /*if (zipcode && breed) {
      let url = '/search' + '/' + zipcode + '/' + breed;
      document.location.replace(url);
    } else if (zipcode) {
      let url = '/search' + '/' + zipcode + '/' + noBreed;
      document.location.replace(url);
    }*/
    console.log(photo_url + " " + adopt_url);
    console.log(dogId + " " + name + " " + gender + " 1 " + breed1 + " 2 " + breed2 + " " + adoptable + " " + distance);
  };
  
  document
    .addEventListener('click', (event) => {
        if(event.target.matches('[type="button"]')){
            saveListDog(event);
        }
    });
  