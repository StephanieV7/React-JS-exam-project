export const getRegisteredUsers = async () => {
    const response = await fetch(`http://localhost:3030/users/users`);
    const result = await response.json();
    return result;
}
