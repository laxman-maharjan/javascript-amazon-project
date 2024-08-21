import { cart, removeFromCart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartItemQuantity } from "../data/cart.js";
import { updateHeaderCartQuantity } from "./checkoutHeader.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    let html = '';
  
    cart.forEach(cartItem => {
      const product = getProduct(cartItem.productId);
      html += `
          <div class="cart-item-container">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
                      <input class="quantity-input js-quantity-input-${cartItem.productId}" type="number" value="${cartItem.quantity}" min="1" oninput="validity.valid || (value='1');">
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${cartItem.productId}">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-1">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-1">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-1">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
    });
  
    document.querySelector('.js-order-summary').innerHTML = html;
    attachEventListeners();
}


function attachEventListeners(){
    document.querySelectorAll('.js-update-quantity-link').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantityInputElement = document.querySelector(`.js-quantity-input-${productId}`);
            const buttonText = button.innerText.trim();

            if(buttonText === 'Update'){
              document.querySelector(`.js-quantity-label-${productId}`).classList.add('make-invisible');
              quantityInputElement.classList.add('make-visible');
              button.innerText = 'Save';
            }
            else if(buttonText === 'Save'){
              updateCartItemQuantity(productId, Number(quantityInputElement.value));
              refreshPage();
            }
        });
    });

    document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
      button.addEventListener('click', () => {
        removeFromCart(button.dataset.productId);
        refreshPage();
      })
    });
}

function refreshPage(){
  updateHeaderCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();
}
