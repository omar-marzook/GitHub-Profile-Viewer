/* Bookmark Repositories
 * It will save the bookmarked repos in localhost storage as JSON
 * There will be a tab to show the bookmarked repos
 * Using Event delegation to handle bookmarks
 */

const pushToLocalStorage = (key, newBookmark) => {
    let savedBookmarks = JSON.parse(localStorage.getItem(key)) || [];

    savedBookmarks.push(newBookmark);

    localStorage.setItem(key, JSON.stringify(savedBookmarks));
};

repoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('repo-card__bookmark')) {
        const repoCard = e.target.closest('.repo-card');
        repoCard.classList.add('repo-card--bookmarked');
        const repoId = repoCard.dataset.id;
        pushToLocalStorage('bookmarkedRepos', repoId);
    }
});

const showBookmarks = () => {
    let savedBookmarks =
        JSON.parse(localStorage.getItem('bookmarkedRepos')) || [];

    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach((card) => {
        if (savedBookmarks.includes(card.dataset.id)) {
            card.classList.add('repo-card--bookmarked');
        }
    });
};

const showBookmarksBtn = document.querySelector('#showBookmarksBtn');

showBookmarksBtn.addEventListener('click', showBookmarks);
