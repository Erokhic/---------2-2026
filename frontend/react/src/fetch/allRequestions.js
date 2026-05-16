export async function allRequestions() {
    
 let url = 'http://localhost:3000/allRequestions';
let response = await fetch(url);

return await response.json();
}