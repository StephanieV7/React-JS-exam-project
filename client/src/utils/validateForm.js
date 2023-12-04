export const validateForm = (formValues) => {
    let error = false;

    if (!formValues.title || !formValues.destinations[0].destination || !formValues.destinations[0].startDate) {
        error = 'Title, destination and start date are required';
        return error;
    }

    for (const destination of formValues.destinations) {
        const startDate = new Date(destination.startDate);
        const endDate = new Date(destination.endDate);
        const currentDate = new Date();

        if (startDate > endDate) {
            error = 'End date cannot be before the start date';
            return error;
        }

        if (endDate < currentDate) {
            error = 'End date cannot be in the past';
            return error;
        }
    }

    return false;
};