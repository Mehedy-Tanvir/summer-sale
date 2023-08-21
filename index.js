let couponApplied = false;
function cardClickHandler(data) {
  //   console.log(data.children[1].children[1]);
  const productName = data.children[1].children[1].innerText;
  const productPriceStr = data.children[1].children[2].innerText.split(" ");
  const productPrice = parseFloat(productPriceStr[0]);
  console.log(productName, productPrice);

  const cartList = document.getElementById("cart-list");
  let count = cartList.childElementCount + 1;

  const p = document.createElement("p");
  p.innerHTML = `<p class="text-[24px] text-left text-[#111] font-medium">${count}. ${productName}</p>`;
  cartList.appendChild(p);

  let totalPrice = getInnerValue("total-price");
  totalPrice += productPrice;
  setInnerValue("total-price", totalPrice.toFixed(2));

  if (totalPrice > 0) {
    const purchaseBtn = document.getElementById("btn-purchase");
    purchaseBtn.removeAttribute("disabled");
    setInnerValue("total", totalPrice.toFixed(2));
    if (totalPrice >= 200) {
      const applyBtn = document.getElementById("btn-apply");
      applyBtn.removeAttribute("disabled");
    }
  }
  if (couponApplied) {
    let discountValue = totalPrice * 0.2;
    let total = totalPrice - discountValue;
    setInnerValue("discount", discountValue.toFixed(2));
    setInnerValue("total", total.toFixed(2));
  }
}

function couponBtnClickHandler() {
  const inputEl = document.getElementById("input-element");
  const inputValue = inputEl.value;
  if (!couponApplied) {
    if (inputValue === "SELL200") {
      let totalPrice = getInnerValue("total-price");
      let discountValue = totalPrice * 0.2;
      let total = totalPrice - discountValue;
      setInnerValue("discount", discountValue.toFixed(2));
      setInnerValue("total", total.toFixed(2));
      couponApplied = true;
    }
  } else {
    return;
  }
}

// shared functions
function getInnerValue(elementId) {
  const element = document.getElementById(elementId);
  const elementValue = parseFloat(element.innerText);
  return elementValue;
}

function setInnerValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}
