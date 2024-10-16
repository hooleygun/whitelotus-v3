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
  emailInput.value = '';
  orderModuleBackground.style.pointerEvents = "none";
  orderModuleBackground.style.opacity = "0%";
  orderModule.style.top = "-300vh";
  body.style.overflowY = 'auto';
  orderButton.disabled = true;
}

function orderModuleOpen(categoryValue) {
  let body = document.querySelector('body');
  let orderModuleBackground = document.getElementById("order-module-background");
  let orderModule = document.getElementById("order-module");
  let roomCategory = document.getElementById("order-rooms-category").querySelectorAll('option');

  orderModuleBackground.style.pointerEvents = "all";
  orderModuleBackground.style.opacity = "100%"

  for ( i=0; i<roomCategory.length; i++){
    if (roomCategory[i].value == categoryValue){
      roomCategory[i].selected = "selected";
    } else {
      roomCategory[i].selected = '';
    }
  }

  if (window.screen.width <= 768){
    orderModule.style.top = "20px";
  }
  else {
    orderModule.style.top = "";
  }
  body.style.overflowY = 'clip';
}



//Check
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



//Date pre-masking
const date = new Date();

let currentDay = date.getDate();
let currentDayPlusOne = date.getDate() + 1;
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
let checkInDateInput = document.getElementById("order-check-in-date");
let departureDateInput = document.getElementById("order-departure-date");

if (currentMonth < 10){
  currentMonth = "0"+currentMonth;
}
if (currentDay < 10){
  currentDay = "0"+currentDay;
}

let currentDate = currentYear+"-"+currentMonth+"-"+currentDay;
let datePlusOne = currentYear+"-"+currentMonth+"-"+currentDayPlusOne;

checkInDateInput.min = currentDate;
departureDateInput.min = datePlusOne;


//Departure date masking
function depDateMask() {
  let departureDateInput = document.getElementById("order-departure-date");
  let checkInDateValue = document.getElementById("order-check-in-date").value;

  let checkInDay = Number(checkInDateValue.slice(8, 10));
  let checkInMonth = Number(checkInDateValue.slice(5, 7));
  let checkInYear = Number(checkInDateValue.slice(0, 4));

  let depDayMin = 0;
  let depMonthMin = 0;
  let depYearMin = 0;

  if (checkInYear % 4 == 0){
    if (checkInMonth == 12) {
      if (checkInDay == 31) {
        depYearMin = checkInYear + 1;
        depMonthMin = 1;
        depDayMin = 1;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
    if (checkInMonth == 1 || checkInMonth == 3 || checkInMonth == 5 || checkInMonth == 7 || checkInMonth == 8 || checkInMonth == 10){
      if (checkInDay == 31) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    } else if (checkInMonth == 4 || checkInMonth == 6 || checkInMonth == 9 || checkInMonth == 11) {
      if (checkInDay == 30) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
    else if (checkInMonth == 2) {
      if (checkInDay == 29) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
  } else {
    if (checkInMonth == 12) {
      if (checkInDay == 31) {
        depYearMin = checkInYear + 1;
        depMonthMin = 1;
        depDayMin = 1;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
    if (checkInMonth == 1 || checkInMonth == 3 || checkInMonth == 5 || checkInMonth == 7 || checkInMonth == 8 || checkInMonth == 10){
      if (checkInDay == 31) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    } else if (checkInMonth == 4 || checkInMonth == 6 || checkInMonth == 9 || checkInMonth == 11) {
      if (checkInDay == 30) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
    else if (checkInMonth == 2) {
      if (checkInDay == 28) {
        depDayMin = 1;
        depMonthMin = checkInMonth + 1;
        depYearMin = checkInYear;
      } else {
        depDayMin = checkInDay + 1;
        depMonthMin = checkInMonth;
        depYearMin = checkInYear;
      }
    }
  }

  depDayMin = '' + depDayMin;
  depMonthMin = '' + depMonthMin;
  depYearMin = '' + depYearMin;

  if (depMonthMin < 10){
    depMonthMin = "0"+depMonthMin;
  }
  if (depDayMin < 10){
    depDayMin = "0"+depDayMin;
  }

  let departureDateMask = depYearMin+"-"+depMonthMin+"-"+depDayMin;

  departureDateInput.min = departureDateMask;
  departureDateInput.value = departureDateMask;
  console.log("Departure date minimum: ", departureDateInput.min);
}