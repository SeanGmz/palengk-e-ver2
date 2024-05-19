import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
              <span class="quantity-label">Quantity: </span>
              <span class="quantity-value" data-product-id="${
                matchingProduct.id
              }">${cartItem.quantity}</span>
              <span class="update-quantity-link link-primary" data-product-id="${
                matchingProduct.id
              }">
                Update
              </span>
              <input type="number" class="quantity-input" style="display: none;">
              <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `₱ ${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping Fee
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // Add event listener to transform quantity label into input box
  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const quantityValue = document.querySelector(
        `.quantity-value[data-product-id="${productId}"]`
      );
      const inputField = document.createElement("input");
      inputField.setAttribute("type", "number");
      inputField.setAttribute("value", quantityValue.textContent);
      inputField.setAttribute("class", "quantity-input");
      quantityValue.parentNode.replaceChild(inputField, quantityValue);

      // Focus the input field for convenience
      inputField.focus();

      // Change the update button to save button
      link.textContent = "Save";

      // Add event listener to save the quantity when input field loses focus
      inputField.addEventListener("blur", () => {
        const newQuantity = parseInt(inputField.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
          updateQuantity(productId, newQuantity);
          renderOrderSummary(); // Re-render the order summary after updating quantity
          renderPaymentSummary(); // Update the payment summary if needed
        } else {
          alert("Please enter a valid quantity.");
          // Revert back to quantity label if input is invalid
          inputField.parentNode.replaceChild(quantityValue, inputField);
          // Change the save button back to update button
          link.textContent = "Update";
        }
      });
    });
  });

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
