const baseUrl = 'http://localhost:3030/data/trips'

export const getAll = async (_id) => {

    const query = new URLSearchParams({
        where: `_ownerId="${_id}"`
    })
    const response = await fetch(`${baseUrl}?${query}`)
    const result = await response.json();
    return result;
}


export const getOne = async (_id) => {
    
    const response = await fetch(`${baseUrl}/${_id}`)
    const result = await response.json();

    return result
}

export const create = async (tripData) => {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(tripData)
    });

    const result = await response.json();

    return result
}