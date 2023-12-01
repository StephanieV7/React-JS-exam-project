const baseUrl = 'http://localhost:3030/data/trips'

export const getAll = async (_id) => {

    const query = new URLSearchParams({
        where: `_ownerId="${_id}"`,
        sortBy: `_createdOn`
        // sortBy: `_createdOn desc`
    })
    const response = await fetch(`${baseUrl}?${query}`)
    const result = await response.json();
    return result;
}

export const getSharedTrips = async (email) => {

    const query = new URLSearchParams({
        where: `shared="${email}"`
    })
    const response = await fetch(`http://localhost:3030/data/trips?${query}`)
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
export const edit = async (_id, tripData) => {
    const response = await fetch(`${baseUrl}/${_id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(tripData)
    });

    const result = await response.json();

    return result
}

export const remove = async (_id) => {

    const response = await fetch(`${baseUrl}/${_id}`, {
        method: 'DELETE', headers: {
            'X-Authorization': localStorage.getItem('accessToken')
        },
    })
    const result = await response.json();
    return result;

}