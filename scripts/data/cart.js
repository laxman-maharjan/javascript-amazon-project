export const cart = [];

export function addToCart(productId){
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);
    matchingItem ? matchingItem.quantity++ : cart.push({
        productId,
        quantity: 1
    });
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}
