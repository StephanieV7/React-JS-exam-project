const baseUrl = 'http://localhost:3030/data/mytrips'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}`);
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