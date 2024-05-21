import { cart, clearCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

// Load realTotalCents from localStorage if available, otherwise initialize it as an empty array
let realTotalCents = JSON.parse(localStorage.getItem("realTotalCents")) || [];

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const distinctItemCount = cart.length;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row ">
      <div>Items (${distinctItemCount}):</div>
      <div class="payment-summary-money">
        ₱ ${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money">
        ₱ ${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        ₱ ${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        ₱ ${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        ₱ ${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      console.log("Place order button clicked");

      // Add the totalCents value to the beginning of the realTotalCents array
      realTotalCents.unshift(totalCents);

      // Save the updated realTotalCents array to localStorage
      localStorage.setItem("realTotalCents", JSON.stringify(realTotalCents));

      // Log the realTotalCents array
      console.log("Updated realTotalCents:", getRealTotalCents());

      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cart }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();
        addOrder(order);

        // Clear the cart after successful order placement
        clearCart();

        // Redirect to the orders page
        window.location.href = "orders.html";
      } catch (error) {
        console.error("Unexpected error. Try again later.", error);
      }
    });
}

// Function to retrieve realTotalCents from localStorage
export function getRealTotalCents() {
  return JSON.parse(localStorage.getItem("realTotalCents")) || [];
}

// Function to clear realTotalCents from localStorage
export function clearRealTotalCents() {
  localStorage.removeItem("realTotalCents");
}

// Export realTotalCents
export { realTotalCents };
