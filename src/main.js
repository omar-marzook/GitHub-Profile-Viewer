const loader = document.getElementById('loading');
const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');

async function fetchRepos(username) {
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

        handleFetchData(data);
    } catch (error) {
        profileName.innerHTML = `<span style="color: red">${error.message}</span>`;
    } finally {
        loader.style.display = 'none';
        repoList.style.display = 'grid';
    }
}

const handleFetchData = (data) => {
    if (data != false) {
        data.forEach((repo) => {
            profileName.innerHTML = repo.owner.login;
            const cardHTML = `
                <article class="repo-card">
                    <h3 class="repo-card__name">${repo.name}</h3>
                    <a class="repo-card__btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
                </article>
            `;
            repoList.insertAdjacentHTML('beforeend', cardHTML);
        });
    } else {
        profileName.innerHTML =
            '<span style="color: red">User not found!</span>';
    }
};

const usernameInput = document.querySelector('#username');
const searchBtn = document.querySelector('#getRepos');

usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});

searchBtn.addEventListener('click', () => {
    repoList.innerHTML = '';
    const username = usernameInput.value;
    fetchRepos(username);
});
