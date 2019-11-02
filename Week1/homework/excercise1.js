'use strict';

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getACat(url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // try catch
      try {
        // console.log(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
      } catch (err) {
        console.log(err); // msg
      }
    }
  };

  xhr.open('GET', url); // 3rd parameter for authentication
  xhr.send();
}

getACat('https://api.thecatapi.com/v1/images/search?size=full');

// AXIOS

const axios = require('axios');

axios
  .get('https://api.thecatapi.com/v1/images/search?size=full')
  .then(response => {
    // handle success
    console.log(response.data);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
    console.log('closing important files for more security');
  });
