const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');

async function fetchRepos(username) {
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

const searchBtn = document.querySelector('#getRepos');

searchBtn.addEventListener('click', () => {
    repoList.innerHTML = '';
    const username = document.querySelector('#username').value;
    fetchRepos(username);
});
