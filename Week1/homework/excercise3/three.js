'use strict';

const myURL = 'https://picsum.photos/400';

// ==============================================================
const requestXHRAndCreateImg = url => {
  // creating an img
  const img = document.createElement('img');
  document.body.appendChild(img);

  // create xhr request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    try {
      if (xhr.readyState == 4 && xhr.status == 200) {
        img.src = xhr.responseURL;
      }
    } catch (error) {
      console.log(error);
    }
  };
  xhr.send();
};

requestXHRAndCreateImg(myURL);

// AXIOS ====================================================
const axios = require('axios');

const requestAxiosAndCreateImg = url => {
  // creating an img
  const img = document.createElement('img');
  document.body.appendChild(img);
  document.body.style.backgroundColor = 'blue';

  // create xhr request
  axios
    .get(url)
    .then(res => {
      img.src = res.request.responseURL;
    })
    .catch(error => console.log(error));
};

requestAxiosAndCreateImg(myURL);
