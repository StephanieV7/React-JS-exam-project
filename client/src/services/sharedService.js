const baseUrl = `http://localhost:3030/data/passengerInfo/`

export const create = async (data, tripId) => {
    data._tripId = tripId
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

export const getPassengerInfo = async (_id) => {

    const query = new URLSearchParams({
        where: `_tripId="${_id}"`
    })
    const response = await fetch(`${baseUrl}/?${query}`)
    const result = await response.json();
    return result;
}

export const removePassengerInfo = async (_id) => {

    const response = await fetch(`${baseUrl}/${_id}`, {
        method: 'DELETE', headers: {
            'X-Authorization': localStorage.getItem('accessToken')
        },
    })
    const result = await response.json();
    return result;

}