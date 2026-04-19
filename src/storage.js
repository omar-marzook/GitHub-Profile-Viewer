/* Bookmark Repositories
 * It will save the bookmarked repos in localhost storage as JSON
 * There will be a tab to show the bookmarked repos
 * Using Event delegation to handle bookmarks
 */

export const storeBookmark = (key, newBookmark) => {
    let savedBookmarks = JSON.parse(localStorage.getItem(key)) || [];

    savedBookmarks.push(newBookmark);

    localStorage.setItem(key, JSON.stringify(savedBookmarks));
};

export const showBookmarks = () => {
    let savedBookmarks =
        JSON.parse(localStorage.getItem('bookmarkedRepos')) || [];

    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach((card) => {
        if (savedBookmarks.includes(card.dataset.id)) {
            card.classList.add('repo-card--bookmarked');
        }
    });
};
