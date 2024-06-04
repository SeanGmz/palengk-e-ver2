export let cart;

loadFromStorage();
updateCartCount();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
  updateCartCount();
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  cart = [];
  saveToStorage();
  updateCartCount();
}

export function addToCart(productId, quantity = 1) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
  updateCartCount();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
  updateCartCount();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    saveToStorage(); // Save the updated cart to storage
  }
}

function updateCartCount() {
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    const distinctItemCount = cart.length;
    cartQuantityElement.textContent = distinctItemCount;
  }

  const cartDistinctCountElement = document.querySelector(
    ".js-cart-distinct-count"
  );
  if (cartDistinctCountElement) {
    const distinctItemCount = cart.length;
    cartDistinctCountElement.textContent = `${distinctItemCount} item${
      distinctItemCount !== 1 ? "s" : ""
    }`;
  }
}

// Update the cart count when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
});
