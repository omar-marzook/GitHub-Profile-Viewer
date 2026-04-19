const loader = document.getElementById('loading');
export const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');

export const showLoader = () => {
    loader.style.display = 'block';
    repoList.style.display = 'none';
};

export const hideLoader = () => {
    loader.style.display = 'none';
    repoList.style.display = 'grid';
};

export const handleData = (data) => {
    if (!data.length) {
        profileName.textContent = 'No public repositories found.';
        return;
    }
    profileName.textContent = data[0]?.owner?.login ?? 'Unknown';
    implementCards(data);
};

// Handle DOM
export const implementCards = (data) => {
    data.forEach((repo) => {
        const cardHTML = `
                <article class="repo-card" data-id="${repo.id}">
                    <h3 class="repo-card__name">${repo.name}</h3>
                    <section class="repo-card__details">
                    <p class="repo-card__date">Updated date: ${repo.updated_at?.split('T')[0] ?? 'N/A'}</p>
                    <p class="repo-card__stars">${repo.stargazers_count} ⭐ stars</p>
                    <p class="repo-card__private">${repo.visibility} visibility</p>
                    <p class="repo-card__lang">${repo.language ?? 'Not specified'}</p>
                    </section>
                    <a class="repo-card__btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
                    <button class="repo-card__bookmark">Bookmark</button>
                </article>
            `;
        repoList.insertAdjacentHTML('beforeend', cardHTML);
    });
};

export const clearCardsList = () => {
    repoList.innerHTML = '';
};

export const renderError = (error) => {
    profileName.innerHTML = `<span style="color: red">${error.message}</span>`;
};

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

export const renderStats = (data) => {
    const stats = getStats(data);

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

export const renderFilter = (data) => {
    const languages = getLanguages(data);

    languages.forEach((lang) => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        langSelect.appendChild(option);
    });
};