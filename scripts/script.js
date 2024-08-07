onLoad();
function onLoad() {
  displayItemOnHomePage();
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
          <img
            src="${item.image}"
            alt="Watch Image"
            class="item-image"
          />
          <div class="item-name">
            ${item.item_name}
          </div>
          <div class="item-price">Rs ${item.original_price}</div>
        </div>
   `;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
