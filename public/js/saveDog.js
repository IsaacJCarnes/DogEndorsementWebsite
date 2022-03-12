const saveListDog = async (event) => {
  let dogId = event.target.previousElementSibling.value;
  let target = event.target.parentElement.parentElement.parentElement;
  event.preventDefault();
  let dog_adopt_url = target.childNodes[5].childNodes[1].href;
  let dog_photo_url = target.childNodes[3].childNodes[1].currentSrc;
  let dataHolder = target.childNodes[1];
  let dogName = dataHolder.childNodes[3].innerText;
  let dogGender = dataHolder.childNodes[7].innerText;
  let dogBreed1 = dataHolder.childNodes[11].innerText;
  let dogBreed2 = null;
  if (dataHolder.childNodes[13].innerText) {
    dogBreed2 = dataHolder.childNodes[13].innerText;
  }
  let dogAdoptable = target.childNodes[5].childNodes[5].innerText;
  dogAdoptable = dogAdoptable.substring(11, dogAdoptable.length);
  let dogDistance = target.childNodes[5].childNodes[7].innerText;
  dogDistance = dogDistance.substring(0, dogDistance.length - 11);

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
  };
  //const breed = document.querySelector("#breeds").value.trim();
  /*if (zipcode && breed) {
      let url = '/search' + '/' + zipcode + '/' + breed;
      document.location.replace(url);
    } else if (zipcode) {
      let url = '/search' + '/' + zipcode + '/' + noBreed;
      document.location.replace(url);
    }*/

  const response = await fetch("/api/dogs", {
    method: "POST",
    body: JSON.stringify({ dog }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
  } else {
    alert("Failed to save dog");
  }
};

document.addEventListener("click", (event) => {
  if (event.target.matches('[type="button"]')) {
    saveListDog(event);
  }
});
