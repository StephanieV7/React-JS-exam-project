const baseUrl = 'http://localhost:3030/data/news'

export const getAllArticles = async () => {
    try {
        const response = await fetch(`${baseUrl}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {

        throw error;
    }
};

export const createArticle = async (data, username) => {
    data.author = username;
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result
}

export const deleteArticle = async (id) => {

    await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': localStorage.getItem('accessToken')
        },
    });
}