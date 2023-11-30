export const create = async (data, _id) => {
    data._tripId = _id
    const response = await fetch(`http://localhost:3030/data/passengerInfo`, {
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
    const response = await fetch(`http://localhost:3030/data/passengerInfo/?${query}`)
    const result = await response.json();
    return result;
}