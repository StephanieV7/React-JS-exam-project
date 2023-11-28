export const create = async (data, email) => {
    const response = await fetch(`http://localhost:3030/data/trips`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data, {
            shared: email
        })
    });

    const result = await response.json();

    return result
}

export const getSharedTrips = async (email) => {

    const query = new URLSearchParams({
        where: `shared="${email}"`
    })
    const response = await fetch(`http://localhost:3030/data/trips?${query}`)
    const result = await response.json();
    return result;
}