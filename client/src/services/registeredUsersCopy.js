export const getRegisteredUsersCopy = async () => {

    const response = await fetch(`http://localhost:3030/data/registeredUsersCopy`)
    const result = await response.json();
    return result;
}
