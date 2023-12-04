const baseUrl = 'http://localhost:3030/data/news'

export const getAllNews = async () => {
    try {
        const response = await fetch(`${baseUrl}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error; 
    }
};

export const createNews = async (newsData) => {
    
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(newsData)
    });

    const result = await response.json();

    return result
}