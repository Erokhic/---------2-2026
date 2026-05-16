export async function pushComment(newComment){
let response = await fetch('http://localhost:3000/addNewComment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(newComment)
});
 const result = await response.json();
 return result;
}