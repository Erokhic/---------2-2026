export async function getUserById(userId) {
        let response = await fetch(`http://localhost:3000/user/${userId}`);
        const result = await response.json();
        return result;
}