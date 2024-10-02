function orderModuleClose() {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let orderModule = document.getElementById("order-module");
  let orderButton = document.getElementById("order-button");
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
  orderButton.disabled = true;
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

function validation(){
  let roolsCheckbox = document.getElementById("order-rools-acception-checkbox");
  let personalDataCheckbox = document.getElementById("order-personal-data-acception-radio-button");
  let orderButton = document.getElementById("order-button");

  let nameInput = document.getElementById("order-name");
  let numberInput = document.getElementById("order-number");
  let checkInDateInput = document.getElementById("order-check-in-date");
  let departureDateInput = document.getElementById("order-departure-date");
  let guestsQuantityInput = document.getElementById("order-guests-quantity");
  let roomsCategoryInput = document.getElementById("order-rooms-category");
  let emailInput = document.getElementById("order-email");

  if ((roolsCheckbox.checked) && (personalDataCheckbox.checked) && (nameInput.checkValidity() == true) && (numberInput.checkValidity() == true)
    && (checkInDateInput.checkValidity() == true)  && (departureDateInput.checkValidity() == true)  && (guestsQuantityInput.checkValidity() == true)  && (roomsCategoryInput.checkValidity() == true)  && (emailInput.checkValidity() == true)) {
    orderButton.disabled = false;
  } else {
    orderButton.disabled = true;
  }
}

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let checkInDateInput = document.getElementById("order-check-in-date");
let departureDateInput = document.getElementById("order-departure-date");
if (month < 10){
  month = "0"+month;
}
if (day < 10){
  day = "0"+day;
}
let currentDate = year+"-"+month+"-"+day;
checkInDateInput.min = currentDate;
departureDateInput.min = currentDate;