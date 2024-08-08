let bagItems;

onLoad();
function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemOnHomePage();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayItemOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = ``;
  items.forEach((item) => {
    innerHtml += `
      <div class="item-container">
          <div class="image-container">
            <img
              src="${item.image}"
              alt="Watch Image"
              class="item-image"
            />
            <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
          </div>
          <div class="item-name">
              ${item.item_name}
          </div>
          <div class="item-price">Rs ${item.original_price}</div>
      </div>
   `;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
