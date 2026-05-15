export async function getPaymentMethod() {
    
 let url = 'http://localhost:3000/payment_method';
let response = await fetch(url);

return await response.json();
}