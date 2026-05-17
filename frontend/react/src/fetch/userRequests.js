
export async function userRequests(userId) {
    
 let url = `http://localhost:3000/requests/${userId}`;
let response = await fetch(url);

return await response.json();
}