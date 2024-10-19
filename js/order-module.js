function orderModuleClose() {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let orderButton = document.getElementById("order-button");
  let roolsAccept = document.querySelector('[name="roolsAccept"]');
  let privacyAcceptInput = document.querySelector('[name="privacyAccept"]');
  let inputs = document.querySelectorAll('input');
  for ( i = 0; i < inputs.length; i++){
    inputs[i].value = '';
  };
  orderModuleBackground.style.pointerEvents = "none";
  orderModuleBackground.style.opacity = "0%";
  orderModuleBackground.style.overflowY = 'clip';
  body.style.overflowY = 'auto';

  roolsAccept.checked = false;
  privacyAcceptInput.checked = false;
  orderButton.disabled = true;
}

function orderModuleOpen(categoryValue) {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let roomCategory = document.getElementById("order-rooms-category").querySelectorAll('option');
  let roolsAccept = document.querySelector('[name="roolsAccept"]');
  let privacyAcceptInput = document.querySelector('[name="privacyAccept"]');
  let inputs = document.querySelectorAll('input');
  for ( i = 0; i < inputs.length; i++){
    inputs[i].value = '';
  };

  orderModuleBackground.style.pointerEvents = "all";
  orderModuleBackground.style.opacity = "100%"

  for ( i=0; i<roomCategory.length; i++){
    if (roomCategory[i].value == categoryValue){
      roomCategory[i].selected = "selected";
    } else {
      roomCategory[i].selected = '';
    }
  }
  body.style.overflowY = 'clip';
  orderModuleBackground.style.overflowY = 'auto';
  roolsAccept.checked = false;
  privacyAcceptInput.checked = false;
}



//Phone number masking
document.addEventListener("DOMContentLoaded", function () {
  var phoneInputs = document.querySelectorAll('input[data-tel-input]');

  var getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
      var input = e.target,
          inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
          var pastedText = pasted.getData('Text');
          if (/\D/g.test(pastedText)) {
              // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
              // formatting will be in onPhoneInput handler
              input.value = inputNumbersValue;
              return;
          }
      }
  }

  var onPhoneInput = function (e) {
      var input = e.target,
          inputNumbersValue = getInputNumbersValue(input),
          selectionStart = input.selectionStart,
          formattedInputValue = "";

      if (!inputNumbersValue) {
          return input.value = "";
      }

      if (input.value.length != selectionStart) {
          // Editing in the middle of input, not last symbol
          if (e.data && /\D/g.test(e.data)) {
              // Attempt to input non-numeric symbol
              input.value = inputNumbersValue;
          }
          return;
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
          if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
          var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
          formattedInputValue = input.value = firstSymbols + " ";
          if (inputNumbersValue.length > 1) {
              formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
          }
          if (inputNumbersValue.length >= 5) {
              formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
          }
          if (inputNumbersValue.length >= 8) {
              formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
          }
          if (inputNumbersValue.length >= 10) {
              formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
          }
      } else {
          formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
  }
  var onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
          e.target.value = "";
      }
  }
  for (var phoneInput of phoneInputs) {
      phoneInput.addEventListener('keydown', onPhoneKeyDown);
      phoneInput.addEventListener('input', onPhoneInput, false);
      phoneInput.addEventListener('paste', onPhonePaste, false);
  }
})



//Validation
function validation(){
  const date = new Date();
  let currentDay = '' + date.getDate();
  let currentMonth = '' + (date.getMonth() + 1);
  let currentYear = '' + date.getFullYear();

  let nameInput = document.querySelector('[name="name"]');
  let phoneInput = document.querySelector('[name="phone"]');
  let dateRangeInputInput = document.querySelector('[name="dateRangeInput"]');
  let guestsQuantityInput = document.querySelector('[name="guestsQuantity"]');
  let roomCategoryInput = document.querySelector('[name="roomCategory"]');
  let emailInput = document.querySelector('[name="email"]');
  let roolsAccept = document.querySelector('[name="roolsAccept"]');
  let privacyAcceptInput = document.querySelector('[name="privacyAccept"]');

  let firstDate = dateRangeInputInput.value.slice(0,10);
  let firstDay = firstDate.slice(0,2);
  let firstMonth = firstDate.slice(3,5);
  let firstYear = firstDate.slice(6,10);
  let secondDate = dateRangeInputInput.value.slice(13,24);
  let secondDay = secondDate.slice(0,2);
  let secondMonth = secondDate.slice(3,5);
  let secondYear = secondDate.slice(6,10);

  let orderButton = document.getElementById("order-button");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if ( nameInput.value.length > 2 && privacyAcceptInput.checked && roolsAccept.checked && emailRegex.test(emailInput.value) && guestsQuantityInput.value > 0) {
    if (roomCategoryInput.value === 'Стандарт' || roomCategoryInput.value === 'Стандарт+' || roomCategoryInput.value === 'Семейный' || roomCategoryInput.value === 'Семейный+') {
      if (phoneInput.value.length > 16){
        if (dateRangeInputInput.value.length > 16){
          if (firstYear > currentYear) {
            if (secondYear > firstYear) {
              orderButton.disabled = false;
            } else if (secondYear === firstYear) {
              if (secondMonth > firstMonth){
                orderButton.disabled = false;
              } else if (secondMonth === firstMonth && secondDay > firstDay) {
                orderButton.disabled = false;
              } else {orderButton.disabled = true; console.log("Error 1");}
            } else {orderButton.disabled = true; console.log("Error 2");}
          } else if (firstYear === currentYear) {
            if (firstMonth > currentMonth) {
              if (secondYear > firstYear) {
                orderButton.disabled = false;
              } else if (secondYear === firstYear) {
                if (secondMonth > firstMonth){
                  orderButton.disabled = false;
                } else if (secondMonth === firstMonth && secondDay > firstDay) {
                  orderButton.disabled = false;
                } else {orderButton.disabled = true; console.log("Error 1");}
              } else {orderButton.disabled = true; console.log("Error 2");}
            } else if (firstMonth === currentMonth && firstDay >= currentDay){
              if (secondYear > firstYear) {
                orderButton.disabled = false;
              } else if (secondYear === firstYear) {
                if (secondMonth > firstMonth){
                  orderButton.disabled = false;
                } else if (secondMonth === firstMonth && secondDay > firstDay) {
                  orderButton.disabled = false;
                } else {orderButton.disabled = true; console.log("Error 1");}
              } else {orderButton.disabled = true; console.log("Error 2");}
            } else {orderButton.disabled = true; console.log("Error 3");}
          } else {orderButton.disabled = true; console.log("Error 4");}
        } else {orderButton.disabled = true; console.log("Error 5");}
      } else {orderButton.disabled = true; console.log("Error 6");}
    } else {orderButton.disabled = true; console.log("Error 7");}
  } else {orderButton.disabled = true; console.log("Error 8");}
};



//Form sending
document.querySelector('form').onsubmit = async e => {
  e.preventDefault();
  let response = await fetch('php/mail.php', {
      method: 'POST',
      body: new FormData(e.target) 
  });
  let result = await response.text();
  orderModuleClose();
};