export async function getCourseName(userId) {
 let url = `http://localhost:3000/coursesNames/${userId}`;
let response = await fetch(url);
return await response.json();
}