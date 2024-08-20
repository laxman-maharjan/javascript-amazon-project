import { getProduct } from "./products.js";

export const cart = loadFromStorage();

function loadFromStorage(){
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartItem(productId){
    return cart.find(cartItem => cartItem.productId === productId);
}


export function addToCart(productId, quantity){
    const matchingItem = getCartItem(productId);;
    matchingItem ? matchingItem.quantity += quantity : cart.push({
        productId,
        quantity
    });
    saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    
    return cartQuantity;
}

export function calculateCartPriceCents(){
    let cartPriceCents = 0;
    
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        const totalProductPrice = product.priceCents * cartItem.quantity;
        cartPriceCents += totalProductPrice;
    });

    return cartPriceCents;
}

export function updateCartItemQuantity(productId, quantity){
    const matchingItem = getCartItem(productId);
    matchingItem.quantity = quantity;
    saveToStorage();
}
