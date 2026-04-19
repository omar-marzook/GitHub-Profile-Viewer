/* Bookmark Repositories
 * It will save the bookmarked repos in localhost storage as JSON
 * There will be a tab to show the bookmarked repos
 * Using Event delegation to handle bookmarks
 */

const repoBookmarkKey = 'bookmarkedRepos';

export const storeBookmark = (newBookmark) => {
    let savedBookmarks =
        JSON.parse(localStorage.getItem(repoBookmarkKey)) || [];

    savedBookmarks.push(newBookmark);

    localStorage.setItem(repoBookmarkKey, JSON.stringify(savedBookmarks));
};

export const getBookmarks = () =>
    JSON.parse(localStorage.getItem(repoBookmarkKey)) || [];
