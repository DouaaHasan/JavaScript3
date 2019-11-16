'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      try {
        // clear container
        this.container.innerHTML = '';
        createAndAppend('h3', this.container, { text: 'Contributions' });
        const ulContributors = createAndAppend('ul', this.container, {
          class: 'contributors-list',
        });
        contributors.forEach(contributor => {
          const liContributor = createAndAppend('li', ulContributors, {
            class: 'contributor',
          });

          createAndAppend('img', liContributor, {
            src: contributor.avatar_url,
            class: 'contributorImg',
          });

          createAndAppend('a', liContributor, {
            text: contributor.login,
            href: contributor.html_url,
          });

          createAndAppend('p', liContributor, {
            text: contributor.contributions,
            class: 'right',
          });
        });
      } catch (error) {
        return new Error(error.message);
      }
    }
  }
  window.ContributorsView = ContributorsView;
}
