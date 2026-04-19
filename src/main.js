import { fetchRepos } from './api.js';
import {
    handleData,
    implementCards,
    clearCardsList,
    renderStats,
    showLoader,
    hideLoader,
    renderError,
    renderFilter,
} from './render.js';

const allReposData = [];
let filteredRepos = [];

const loadRepos = async (username) => {
    showLoader();
    allReposData.length = 0;
    filteredRepos.length = 0;
    langSelect.innerHTML = '<option value="all">All</option>';

    try {
        const data = await fetchRepos(username);

        allReposData.push(...data);
        filteredRepos.push(...allReposData);

        handleData(allReposData);
        renderStats(allReposData);
        renderFilter(allReposData);
    } catch (error) {
        renderError(error);
    } finally {
        hideLoader();
    }
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
    clearCardsList();
    loadRepos(username);
});

// Language Filter
const langSelect = document.querySelector('#language-filter');

// const getLanguages = (data) =>
//     data.reduce((langs, repo) => {
//         if (repo.language) langs.add(repo.language);
//         return langs;
//     }, new Set());

// const renderFilter = (data) => {
//     const languages = getLanguages(data);

//     languages.forEach((lang) => {
//         const option = document.createElement('option');
//         option.value = lang;
//         option.textContent = lang;
//         langSelect.appendChild(option);
//     });
// };

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
