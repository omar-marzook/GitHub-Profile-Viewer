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
        renderStats();
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
                    <p class="repo-card__stars">${repo.stargazers_count} ⭐ stars</p>
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

// Stats Summary
const getStats = (data) =>
    data.reduce(
        (acc, repo) => ({
            totalRepos: acc.totalRepos + 1,
            totalStars: acc.totalStars + (repo.stargazers_count ?? 0),
            langCounts: repo.language
                ? {
                      ...acc.langCounts,
                      [repo.language]: (acc.langCounts[repo.language] ?? 0) + 1,
                  }
                : acc.langCounts,
        }),
        { totalRepos: 0, totalStars: 0, langCounts: {} },
    );

const renderStats = () => {
    const stats = getStats(allReposData);

    const repoCountEl = document.querySelector('#repo-count');
    const starsCountEl = document.querySelector('#stars-count');
    const langsCountEl = document.querySelector('#langs-count');
    const langsListEl = document.querySelector('.langs-list');

    repoCountEl.textContent = stats.totalRepos;
    starsCountEl.textContent = stats.totalStars;
    langsCountEl.textContent = Object.keys(stats.langCounts).length;

    Object.entries(stats.langCounts).forEach(([lang, count]) => {
        const langItem = `<li>${lang}: ${count}</li>`;
        langsListEl.insertAdjacentHTML('beforeend', langItem);
    });
};

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

const starsSelect = document.querySelector('#stars-sort');
const dateSelect = document.querySelector('#date-sort');

const applyFiltersAndSort = () => {
    let result = [...filteredRepos];

    const starVal = starsSelect.value;
    if (starVal === 'asc') {
        result.sort((a, b) => a.stargazers_count - b.stargazers_count);
    } else if (starVal === 'dsc') {
        result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    const dateVal = dateSelect.value;
    if (dateVal === 'asc') {
        result.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    } else if (dateVal === 'dsc') {
        result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    clearCardsList();
    implementCards(result);
};

starsSelect.addEventListener('change', applyFiltersAndSort);
dateSelect.addEventListener('change', applyFiltersAndSort);

langSelect.addEventListener('change', () => {
    if (langSelect.value !== 'all') {
        filteredRepos.length = 0;
        filteredRepos.push(
            ...allReposData.filter(
                (repo) => repo.language === langSelect.value,
            ),
        );
    } else {
        filteredRepos.length = 0;
        filteredRepos.push(...allReposData);
    }
    applyFiltersAndSort();
});
