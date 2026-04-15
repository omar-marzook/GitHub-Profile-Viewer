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
        profileName.innerHTML = data[0].owner.login;

        data.forEach((repo) => {
            const cardHTML = `
                <article class="repo-card">
                    <h3 class="repo-card__name">${repo.name}</h3>
                    <section class="repo-card__details">
                    <p class="repo-card__date">created date: ${repo.created_at.toString().split('T')[0]}</p>
                    <p class="repo-card__stars">${repo.stargazers_count} 🌟 stars</p>
                    <p class="repo-card__private">${repo.visibility} visibility</p>
                    <p class="repo-card__lang">${repo.language || 'Not specified'}</p>
                    </section>
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
