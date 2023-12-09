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
            const error = new Error('Error fetching data')
            error.code = response.status;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export const edit = async (_id, data) => {
    try {
        const response = await fetch(`${baseUrl}/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = new Error('Error fetching data')
            error.code = response.status;
        }

        const result = await response.json();

        return result
    } catch (error) { 
        throw error 
    }
};

export const getAllPassengersInfo = async (_id) => {

    try {
        const query = new URLSearchParams({
            where: `_tripId="${_id}"`
        });
        const response = await fetch(`${baseUrl}/?${query}`);

        if (!response.ok) {
            const error = new Error('Error fetching data')
            error.code = response.status;
        }

        const result = await response.json();

        return result;
    } catch (error) {
        throw error;
    }
}
export const getOnePassengerInfo = async (_id) => {

    try {

        const response = await fetch(`${baseUrl}/${_id}`);

        if (!response.ok) {
            const error = new Error('Error fetching data')
            error.code = response.status;
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
            const error = new Error('Error fetching data')
            error.code = response.status;
        }
    } catch (error) {
        throw error
    }
}