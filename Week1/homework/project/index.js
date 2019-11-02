'use strict';

{
  // LOGIC: Calling API to get the DATA
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  // LOGIC: Create elements out of the data gotten
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  //This is for adding repo details more efficiently
  function showRepoInfo(
    repoInfoLi, // whole line
    titleValue, // title text
    titleDescriptionTag, // value tag
    titleDescription, // value value
    urlPath, // more info
    newTab,
  ) {
    createAndAppend('span', repoInfoLi, {
      text: titleValue,
      class: 'title',
    });
    createAndAppend(titleDescriptionTag, repoInfoLi, {
      text: titleDescription,
      href: urlPath,
      target: newTab,
    });
  }

  // formating the date to locale
  const formatDate = givenDate => {
    const propDate = new Date(givenDate);
    return propDate.toLocaleString('en-US');
  };

  // LOGIC: calling the above function inside the (logic) of new create element function
  function renderRepoDetails(repo, ul) {
    // creating repository info as listItems
    const repoInfoContainer = createAndAppend('li', ul);
    const descriptionTitle = createAndAppend('li', ul);
    const forksTitle = createAndAppend('li', ul);
    const updateTitle = createAndAppend('li', ul);

    // 1st infoLine
    showRepoInfo(repoInfoContainer, 'Repository: ', 'a', repo.name, repo.html_url, '_blank');

    // 2nd infoLine
    showRepoInfo(descriptionTitle, 'Description: ', 'span', repo.description);

    // 3rd infoLine
    showRepoInfo(forksTitle, 'Forks: ', 'span', repo.forks);

    // 4th infoLine
    showRepoInfo(updateTitle, 'Updated: ', 'span', formatDate(repo.updated_at));
  }

  // LOGIC: full operated function using the above ones logics
  function main(url) {
    //
    const root = document.getElementById('root');

    // creating Header change classes & styles
    // should be shown even if the data is not yet gotten
    const hyfHeader = createAndAppend('div', root, { class: 'HYFheader' });
    createAndAppend('img', hyfHeader, { src: 'hyf.png' });
    createAndAppend('h3', hyfHeader, { text: 'HYF Repositories' });

    //
    fetchJSON(url, (err, repos) => {
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      repos.forEach((repo, index) => {
        repos.sort((a, b) => a.name.localeCompare(b.name));
        if (index < 10) {
          const ul = createAndAppend('ul', root);
          renderRepoDetails(repo, ul);
        }
      });
    });
  }

  // API URL
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100&limit=10';

  // Calling the main function on load
  window.onload = () => main(HYF_REPOS_URL);
}
