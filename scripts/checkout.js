import { updateHeaderCartQuantity } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

function loadPage(){
  updateHeaderCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
