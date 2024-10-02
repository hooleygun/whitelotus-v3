function orderModuleClose() {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let orderModule = document.getElementById("order-module");
  let nameInput = document.getElementById("order-name");
  let numberInput = document.getElementById("order-number");
  let checkInDateInput = document.getElementById("order-check-in-date");
  let departureDateInput = document.getElementById("order-departure-date");
  let guestsQuantityInput = document.getElementById("order-guests-quantity");
  let roomsCategoryInput = document.getElementById("order-rooms-category");
  let emailInput = document.getElementById("order-email");
  nameInput.value = '';
  numberInput.value = '';
  checkInDateInput.value = '';
  departureDateInput.value = '';
  guestsQuantityInput.value = '';
  roomsCategoryInput.value = '';
  emailInput.value = '';
  orderModuleBackground.style.pointerEvents = "none";
  orderModuleBackground.style.opacity = "0%";
  orderModule.style.top = "-300vh";

  body.style.overflowY = 'auto';
}

function orderModuleOpen() {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let orderModule = document.getElementById("order-module");
  orderModuleBackground.style.pointerEvents = "all";
  orderModuleBackground.style.opacity = "100%"
  if (window.screen.width <= 768){
    orderModule.style.top = "20px";
  }
  else {
    orderModule.style.top = "";
  }
  

  body.style.overflowY = 'clip';
}

function checkCheckbox(){
  let checkbox = document.getElementById("acception-radio-button");
  let orderButton = document.getElementById("order-button");
  if (checkbox.checked) {
    orderButton.disabled = false;
  } else {
    orderButton.disabled = true;
  }
}