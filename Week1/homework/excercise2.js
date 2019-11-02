'use strict';

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getData(url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // try catch
      try {
        // console.log(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  xhr.open('GET', url); // 3rd parameter for authentication taken as null if not exist.
  xhr.send();
}

getData('https://www.randomuser.me/api');

// AXIOS

const axios = require('axios');

axios
  .get('https://www.randomuser.me/api')
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
    console.log('closing important files');
  });
