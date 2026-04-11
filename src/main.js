function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
            const repoList = document.querySelector('.repo-list');

            data.forEach((repo) => {
                const cardHTML = `
                    <article class="repo-card">
                        <h3 class="repo-card__name">${repo.name}</h3>
                        <a class="repo-card__btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
                    </article>
                `;

                repoList.insertAdjacentHTML('beforeend', cardHTML);
            });
            console.log(data);
        });
}

const searchBtn = document.querySelector('#getRepos');
searchBtn.addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    fetchRepos(username);
});
