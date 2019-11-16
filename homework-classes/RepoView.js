'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      try {
        this.container.innerHTML = '';
        const repoInfoList = createAndAppend('ul', this.container);

        // filling the list items
        const repoInfoListItem = createAndAppend('li', repoInfoList);
        createAndAppend('span', repoInfoListItem, { text: `Repository Name: ` });
        createAndAppend('a', repoInfoListItem, {
          text: repo.name,
          href: repo.html_url,
        });
        createAndAppend('p', repoInfoListItem, {
          text: `Fork:  ${repo.forks_count}`,
        });
        createAndAppend('p', repoInfoListItem, {
          text: `Login:  ${repo.owner.login}`,
        });
        createAndAppend('p', repoInfoListItem, {
          text: `Description:   ${repo.description}`,
        });
        const dateAndTime = new Date(repo.updated_at);
        createAndAppend('p', repoInfoListItem, {
          text: `Updated: ${dateAndTime.toLocaleString('en-US')}`,
        });
      } catch (error) {
        return new Error(error.message);
      }
    }
  }

  window.RepoView = RepoView;
}
