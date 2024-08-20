import { calculateCartQuantity } from "./data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

function updateHeaderCartQuantity(){
  document.querySelector('.js-cart-quantity').innerText = calculateCartQuantity();
}

updateHeaderCartQuantity();
renderOrderSummary();
renderPaymentSummary();
