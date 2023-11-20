const baseUrl = 'http://localhost:3030/jsonstore/mytrips'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();
    return Object.values(result);
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
            'content-type': 'application/json'
        },
        body: JSON.stringify(tripData)
    });

    const result = await response.json();

    return result
}