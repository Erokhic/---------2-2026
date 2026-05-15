export async function pushNewRequest(newRequest){
let response = await fetch('http://localhost:3000/addNewRequest', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(newRequest)
});
 const result = await response.json();
 return result;
}