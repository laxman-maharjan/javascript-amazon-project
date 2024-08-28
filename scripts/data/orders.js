export const orders = loadFromStorage();

function loadFromStorage(){
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export async function placeOrder(cart){
    try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              cart
            })
        });

        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }

        const result = await response.json();
        orders.unshift(result);
        saveToStorage();
    } catch(error){
        console.log(error.message);
    }
}
