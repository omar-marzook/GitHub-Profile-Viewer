const loader = document.getElementById('loading');
const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');
const allReposData = [];

async function fetchGitHubAPI(username) {
    loader.style.display = 'block';
    repoList.style.display = 'none';

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
    } catch (error) {
        profileName.innerHTML = `<span style="color: red">${error.message}</span>`;
    } finally {
        loader.style.display = 'none';
        repoList.style.display = 'grid';
    }
}

const handleData = (data) => {
    profileName.innerHTML = data[0].owner.login;
    implementCards(data);
};

// Handle DOM
const implementCards = (data) => {
    data.forEach((repo) => {
        const cardHTML = `
                <article class="repo-card">
                    <h3 class="repo-card__name">${repo.name}</h3>
                    <section class="repo-card__details">
                    <p class="repo-card__date">Updated date: ${repo.updated_at.toString().split('T')[0]}</p>
                    <p class="repo-card__stars">${repo.stargazers_count} 🌟 stars</p>
                    <p class="repo-card__private">${repo.visibility} visibility</p>
                    <p class="repo-card__lang">${repo.language || 'Not specified'}</p>
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
    repoList.innerHTML = '';
    const username = userNameInput.value;
    fetchGitHubAPI(username);
});

const getLanguages = (data) => {
    const langsArray = data
        .map((repo) => repo.language)
        .filter((lang) => lang !== null);

    const languages = new Set(langsArray);

    return languages;
};

const langSelect = document.querySelector('#language-filter');

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

    const filteredRepos = allReposData.filter(
        (repo) => repo.language === selectedLang,
    );
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
