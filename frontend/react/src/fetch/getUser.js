export async function getUser(formData){
let response = await fetch('http://localhost:3000/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(formData)
});
 const result = await response.json();
 return result;
}