'use strict';

{
  // LOGIC: Calling API to get the DATA by json type
  function fetchJSON(url) {
    return fetch(url).then(res => res.json());
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

  // LOGIC: function to populate the options of the select button according to the repositories fetched
  function renderRepoDetails(repository, index, selectTag) {
    createAndAppend('option', selectTag, { value: index, text: repository.name });
  }

  // the below lines before the main can be executed even if the data is not yet gotten
  const root = document.getElementById('root');
  // creating Header change classes & styles
  const hyfHeader = createAndAppend('div', root, { class: 'HYFheader' });
  createAndAppend('span', hyfHeader, { text: 'HYF Repositories' });

  // MAIN ========================================================================
  function main(url) {
    fetchJSON(url)
      .then(repos => {
        // Select Button
        const select = createAndAppend('select', hyfHeader);
        //
        let selectedRepo = repos[0];
        //
        const bodyContainer = createAndAppend('section', root, {
          class: 'bodyContainer',
        });

        // repo info
        const repoContainer = createAndAppend('section', bodyContainer, {
          class: 'repoContainer',
        });
        const repoInfoList = createAndAppend('ul', repoContainer);

        // contributors
        const contributorsContainer = createAndAppend('section', bodyContainer, {
          class: 'contributorsContainer',
        });

        //
        const displayRepoInfo = () => {
          // clear the boxes on change
          repoInfoList.innerHTML = '';
          contributorsContainer.innerHTML = '';

          // set the value of selected repo dynamically
          selectedRepo = repos[select.value];

          // filling the list items of the selected repository
          const infoLi = createAndAppend('li', repoInfoList);
          createAndAppend('span', infoLi, { text: `Repository Name: ` });
          const repoAnchor = createAndAppend('a', infoLi, {
            text: selectedRepo.name,
            href: selectedRepo.html_url,
            target: '_blank',
          });
          createAndAppend('p', infoLi, {
            text: `Fork:  ${selectedRepo.forks_count}`,
          });
          createAndAppend('p', infoLi, {
            text: `Login:  ${selectedRepo.owner.login}`,
          });
          createAndAppend('p', infoLi, {
            text: `Description:   ${selectedRepo.description}`,
          });
          const dateAndTime = new Date(selectedRepo.updated_at);
          createAndAppend('p', infoLi, {
            text: `Updated: ${dateAndTime.toLocaleString('en-US')}`,
          });

          // filling contributors as per the selected repository
          fetchContributors(selectedRepo, contributorsContainer);
        };

        // display contributors on change:
        select.addEventListener('change', displayRepoInfo);

        // The list of repositories in the select element should be sorted (case-insensitive) on repository name.
        repos.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });

        //
        repos.forEach((repo, index) => renderRepoDetails(repo, index, select));

        //
        displayRepoInfo();
      }) // handling errors
      .catch(err => {
        console.log(err);
        createAndAppend('section', root, {
          text: err.message,
          class: 'alert-error ',
        });
      });
  }

  const fetchContributors = (selectedRepo, contributorsContainer) => {
    createAndAppend('h3', contributorsContainer, { text: 'Contributions' });
    const ulContributor = createAndAppend('ul', contributorsContainer);

    // contributors_url
    fetchJSON(selectedRepo.contributors_url)
      .then(contributors => {
        contributors.forEach(contributor => {
          const li = createAndAppend('li', ulContributor, {
            class: 'contributor',
          });
          createAndAppend('img', li, {
            src: contributor.avatar_url,
            class: 'contributorImg',
          });
          createAndAppend('a', li, {
            text: contributor.login,
            href: contributor.html_url,
            target: '_blank',
          });
          createAndAppend('p', li, {
            text: contributor.contributions,
            class: 'right',
          });
        });
      })
      .catch(err => {
        createAndAppend('section', root, {
          text: err,
          class: 'alert-error ',
        });
      });
  };

  const HYF_REPOS_URL = `https://api.github.com/orgs/HackYourFuture/repos?per_page=100`;

  window.onload = () => main(HYF_REPOS_URL);
}
