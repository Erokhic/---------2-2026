export async function pushUser(newUser){
let response = await fetch('http://localhost:3000/reg', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(newUser)
});
 const result = await response.json();
 return result;
}