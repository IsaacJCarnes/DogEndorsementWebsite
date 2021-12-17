const prefrencesFormHandler = async (event) => {
  event.preventDefault();

  const zipcode = document.querySelector("#zipcode").value.trim();
  const breed = document.querySelector("#breeds").value.trim();
  let noBreed = null;
  if (zipcode && breed) {
    let url = '/search' + '/' + zipcode + '/' + breed;
    document.location.replace(url);
    /*const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });*/
  } else if (zipcode) {
    let url = '/search' + '/' + zipcode + '/' + noBreed;
    document.location.replace(url);
    /*const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });*/
  }
};

document
  .querySelector(".prefrences-form")
  .addEventListener("submit", prefrencesFormHandler);
