export async function getComment() {
let url = `http://localhost:3000/comments`;
let response = await fetch(url);
return await response.json();
}