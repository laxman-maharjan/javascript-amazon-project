import { addToCart, calculateCartQuantity } from "./data/cart.js";
import { orders } from "./data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "./data/products.js";

function getOrderHeaderHtml(order){
    return `
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
        </div>
    `;
}

function getOrderDetailsHtml(order){
    let html = '';
    
    order.products.forEach(orderProduct => {
        const product = getProduct(orderProduct.productId);

        html += `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderProduct.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-btn"
                    data-product-id="${product.id}" data-order-id="${order.id}"
                >
                    <div class="rebuy-not-clicked js-rebuy-unclicked-${product.id}-${order.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </div>
                    <div class="rebuy-clicked js-rebuy-clicked-${product.id}-${order.id}">
                        &#x2713; Added
                    </div>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return html;
}

function updateOrdersHeaderCartQuantity(){
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
}

function renderOrders(){
    let html = '';

    orders.forEach(order => {
        html += `
            <div class="order-container">
                ${getOrderHeaderHtml(order)}
                <div class="order-details-grid">
                    ${getOrderDetailsHtml(order)}
                </div>
            </div>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = html;
    attachEventListeners();
}

function loadPage(){
    updateOrdersHeaderCartQuantity();
    renderOrders();
}

function attachEventListeners(){
    document.querySelectorAll('.js-buy-again-btn').forEach(button => {
        let readdedMessageTimeoutId;

        button.addEventListener('click', () => {
            const {productId, orderId} = button.dataset;
            addToCart(productId, 1);
            updateOrdersHeaderCartQuantity();

            const rebuyUnclicked = document.querySelector(`.js-rebuy-unclicked-${productId}-${orderId}`);
            const rebuyClicked = document.querySelector(`.js-rebuy-clicked-${productId}-${orderId}`);
            rebuyUnclicked.classList.add('make-invisible');
            rebuyClicked.classList.add('make-visible');
            
            if(readdedMessageTimeoutId){
                clearTimeout(readdedMessageTimeoutId);
            }
            
            readdedMessageTimeoutId = setTimeout(() => {
                rebuyUnclicked.classList.remove('make-invisible');
                rebuyClicked.classList.remove('make-visible');
            }, 1000);
        });
    });
}

loadPage();
