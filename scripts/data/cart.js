export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, quantity){
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);
    matchingItem ? matchingItem.quantity += quantity : cart.push({
        productId,
        quantity
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    
    return cartQuantity;
}
