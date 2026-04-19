export const fetchRepos = async (username) => {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
    );

    if (!response.ok) {
        const message =
            response.status === 404 ? 'User not found!' : 'Request failed!';
        throw new Error(message);
    }

    return response.json();
};
