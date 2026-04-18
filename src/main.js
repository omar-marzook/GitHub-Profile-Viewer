const loader = document.getElementById('loading');
const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');
const allReposData = [];
let filteredRepos = [];

async function fetchGitHubAPI(username) {
    loader.style.display = 'block';
    repoList.style.display = 'none';
    allReposData.length = 0;
    filteredRepos.length = 0;
    langSelect.innerHTML = '<option value="all">All Languages</option>';

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`,
        );

        if (!response.ok) {
            const message =
                response.status === 404 ? 'User not found!' : 'Request failed!';
            throw new Error(message);
        }

        const data = await response.json();

        allReposData.push(...data);

        handleData(allReposData);
        addLangsToFilter(allReposData);
        filteredRepos.push(...allReposData);
    } catch (error) {
        profileName.innerHTML = `<span style="color: red">${error.message}</span>`;
    } finally {
        loader.style.display = 'none';
        repoList.style.display = 'grid';
    }
}

const handleData = (data) => {
    if (!data.length) {
        profileName.textContent = 'No public repositories found.';
        return;
    }
    profileName.textContent = data[0]?.owner?.login ?? 'Unknown';
    implementCards(data);
};

// Handle DOM
const implementCards = (data) => {
    data.forEach((repo) => {
        const cardHTML = `
                <article class="repo-card">
                    <h3 class="repo-card__name">${repo.name}</h3>
                    <section class="repo-card__details">
                    <p class="repo-card__date">Updated date: ${repo.updated_at?.split('T')[0] ?? 'N/A'}</p>
                    <p class="repo-card__stars">${repo.stargazers_count} 🌟 stars</p>
                    <p class="repo-card__private">${repo.visibility} visibility</p>
                    <p class="repo-card__lang">${repo.language ?? 'Not specified'}</p>
                    </section>
                    <a class="repo-card__btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
                </article>
            `;
        repoList.insertAdjacentHTML('beforeend', cardHTML);
    });
};

const clearCardsList = () => {
    repoList.innerHTML = '';
};

const userNameInput = document.querySelector('#username');
const searchBtn = document.querySelector('#getRepos');

userNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});

searchBtn.addEventListener('click', () => {
    const username = userNameInput.value.trim();
    if (!username) return;
    repoList.innerHTML = '';
    fetchGitHubAPI(username);
});

// Language Filter
const langSelect = document.querySelector('#language-filter');

const getLanguages = (data) =>
    data.reduce((langs, repo) => {
        if (repo.language) langs.add(repo.language);
        return langs;
    }, new Set());

const addLangsToFilter = (data) => {
    const languages = getLanguages(data);

    languages.forEach((lang) => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        langSelect.appendChild(option);
    });
};

const filterLanguage = () => {
    const selectedLang = langSelect.value;

    const repos = allReposData.filter((repo) => repo.language === selectedLang);
    filteredRepos.length = 0;
    filteredRepos.push(...repos);
    clearCardsList();
    implementCards(filteredRepos);
};

langSelect.addEventListener('change', () => {
    if (langSelect.value !== 'all') {
        filterLanguage();
    } else {
        clearCardsList();
        implementCards(allReposData);
    }
});

/* Stars Sorting
 * It should have three options
 * Not sorted
 * Sorted by stars in ascending order
 * Sorted by stars in descending order
 */
const starsSelect = document.querySelector('#stars-sort');

const sortByStars = () => {
    const selectedStarsSort = starsSelect.value;

    if (selectedStarsSort === 'asc') {
        const sortedReposAsc = [...filteredRepos].sort(
            (a, b) => a.stargazers_count - b.stargazers_count,
        );
        clearCardsList();
        implementCards(sortedReposAsc);
    } else if (selectedStarsSort === 'dsc') {
        const sortedReposDsc = [...filteredRepos].sort(
            (a, b) => b.stargazers_count - a.stargazers_count,
        );
        clearCardsList();
        implementCards(sortedReposDsc);
    } else {
        clearCardsList();
        implementCards(filteredRepos);
    }
};

starsSelect.addEventListener('change', () => {
    // reset the other sorting
    dateSelect.value = 'none';

    sortByStars();
});

/* Date Sorting
 * It should have three options
 * Not sorted
 * Sorted by Date in ascending order
 * Sorted by Date in descending order
 */
const dateSelect = document.querySelector('#date-sort');

const sortByDate = () => {
    const selectedDateSort = dateSelect.value;

    if (selectedDateSort === 'asc') {
        const sortedReposAsc = [...filteredRepos].sort(
            (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
        );
        clearCardsList();
        implementCards(sortedReposAsc);
    } else if (selectedDateSort === 'dsc') {
        const sortedReposDsc = [...filteredRepos].sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
        );
        clearCardsList();
        implementCards(sortedReposDsc);
    } else {
        clearCardsList();
        implementCards(filteredRepos);
    }
};

dateSelect.addEventListener('change', () => {
    // reset the other sorting
    starsSelect.value = 'none';

    sortByDate();
});
