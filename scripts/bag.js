let cartItemObjects;
onLoad();
function onLoad() {
  loadCartItemObjects();
  displayCartItems();
  displayCartSummary();
}

function loadCartItemObjects() {
  //   console.log(bagItems); //load items added in cart/bag
  cartItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(cartItemObjects);
}

function displayCartItems() {
  let cartContainerElement = document.querySelector(".cart-container");
  cartContainerElement.innerHTML = "";
  let innerHtml = `
         <div class="cart-header">
            <div class="header-item header-item-product">Product</div>
            <div class="header-item header-item-price">Price</div>
            <div class="header-item header-item-quantity">Quantity</div>
            <div class="header-item header-item-total">Total</div>
          </div>`;

  cartItemObjects.forEach((cartItem) => {
    innerHtml += generateItemHtml(cartItem);
  });

  cartContainerElement.innerHTML += innerHtml;
}

function removeFromCart(itemId) {
  bagItems = bagItems.filter((cartItemId) => cartItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadCartItemObjects();
  displayCartItems();
  displayCartSummary();
  displayBagIcon(); //from Script.js File
}

function generateItemHtml(item) {
  return `
         <div class="cart-item">
            <div class="product">
              <img
                src="../${item.image}"
                alt="Watch Image"
              />
              <div class="product-details">
                <p>${item.item_name}</p>
              </div>
            </div>
            <div class="price">Rs ${item.original_price}</div>
            <div class="quantity-control">
              <div class="quantity-box">
                <button class="quantity-btn quantity-dec">-</button>
                <input type="number" value="1" class="quantity" min="1" />
                <button class="quantity-btn quantity-inc">+</button>
              </div>
              <a href="#" class="remove-link" onclick="removeFromCart(${item.id})">Remove</a>
            </div>
            <div class="total">Rs${item.original_price}</div>
          </div>
`;
}

function displayCartSummary() {
  let subtotal = 0;
  document.querySelectorAll(".cart-item .total").forEach((totalElement) => {
    const itemTotalText = totalElement.textContent.replace("Rs ", "");
    const itemTotal = parseFloat(itemTotalText);
    if (!isNaN(itemTotal)) {
      subtotal += itemTotal;
    }
  });

  let cartSummaryElement = document.querySelector(".cart-summary");
  cartSummaryElement.innerHTML = `<div class="total-details">
    <div>Subtotal</div>
    <div>Rs ${subtotal}</div>
  </div>
  <div class="continue-container">
    <button class="continue-btn">CONTINUE SHOPPING</button>
  </div>
  <div class="order-container">
    <button class="order-btn">PLACE ORDER</button>
  </div>`;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("quantity-inc")) {
    updateQuantity(event.target, 1);
  } else if (event.target.classList.contains("quantity-dec")) {
    updateQuantity(event.target, -1);
  }
});

function updateQuantity(button, change) {
  const cartItem = button.closest(".cart-item");
  const quantityInput = cartItem.querySelector(".quantity");
  let currentQuantity = parseInt(quantityInput.value, 10);

  currentQuantity += change;

  if (currentQuantity < 1) currentQuantity = 1;

  quantityInput.value = currentQuantity;

  const priceElement = cartItem.querySelector(".price");
  const totalElement = cartItem.querySelector(".total");
  const price = parseFloat(priceElement.textContent.replace("Rs ", ""));

  const newTotal = price * currentQuantity;
  totalElement.textContent = `Rs ${newTotal}`;

  updateCartSummary();
}

function updateCartSummary() {
  let subtotal = 0;
  document.querySelectorAll(".cart-item .total").forEach((totalElement) => {
    const itemTotalText = totalElement.textContent.replace("Rs ", "");
    const itemTotal = parseFloat(itemTotalText);
    if (!isNaN(itemTotal)) {
      subtotal += itemTotal;
    }
  });

  const subtotalElement = document.querySelector(
    ".total-details div:last-child"
  );
  if (subtotalElement) {
    subtotalElement.textContent = `Rs ${subtotal}`;
  }
}
