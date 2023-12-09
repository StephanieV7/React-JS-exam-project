const baseUrl = 'http://localhost:3030/data/trips'

export const create = async (tripData) => {

    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(tripData)
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
}

export const getAll = async (userId) => {

    try {
        const query = new URLSearchParams({
            where: `_ownerId="${userId}"`,
        });
        const response = await fetch(`${baseUrl}?${query}&sortBy=_createdOn%20desc`);

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

export const getOne = async (_id) => {
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
};

export const edit = async (_id, tripData) => {
    try {
        const response = await fetch(`${baseUrl}/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(tripData)
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
}

export const remove = async (_id) => {

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

export const getSharedTrips = async (email) => {
    try {
        const query = new URLSearchParams({
            where: `shared="${email}"`
        });
        const response = await fetch(`http://localhost:3030/data/trips?${query}`);

        if (!response.ok) {
            const error = new Error('Error fetching data')
            error.code = response.status;
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}