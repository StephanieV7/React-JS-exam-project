const baseUrl = `http://localhost:3030/data/passengerInfo/`

export const create = async (data, tripId) => {
    try {
        data._tripId = tripId;
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to create passenger info: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export const getPassengerInfo = async (_id) => {

    try {
        const query = new URLSearchParams({
            where: `_tripId="${_id}"`
        });
        const response = await fetch(`${baseUrl}/?${query}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch passenger info: ${response.status}`);
        }

        const result = await response.json();
        
        return result;
    } catch (error) {
        throw error; 
    }
}

export const removePassengerInfo = async (_id) => {
    try {
        const response = await fetch(`${baseUrl}/${_id}`, {
            method: 'DELETE', headers: {
                'X-Authorization': localStorage.getItem('accessToken')
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete passenger info: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
       
        throw error;
    }
}