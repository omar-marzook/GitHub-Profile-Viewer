const repoList = document.querySelector('.repo-list');
const profileName = document.querySelector('#profile');

function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())

        .then((data) => {
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
                profileName.innerHTML = '<span style="color: red">User not found!</span>';
            }
        })
        .catch((error) => alert(error));
}

const searchBtn = document.querySelector('#getRepos');

searchBtn.addEventListener('click', () => {
    repoList.innerHTML = '';
    const username = document.querySelector('#username').value;
    fetchRepos(username);
});
