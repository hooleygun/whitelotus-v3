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



//Validation
function validation(){
  const date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

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
      if (phoneInput.value != ''){
        if (dateRangeInputInput.value != ''){
          if (firstYear >= currentYear && firstMonth >= currentMonth && firstDay >= currentDay) {
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
/*const date = new Date();

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
function depDateMaskValid(mode) {

  let departureDateInput = document.getElementById("order-departure-date");
  let checkInDateValue = document.getElementById("order-check-in-date").value;
  let departureDateValue = document.getElementById("order-departure-date").value;

  let checkInDay = Number(checkInDateValue.slice(8, 10));
  let checkInMonth = Number(checkInDateValue.slice(5, 7));
  let checkInYear = Number(checkInDateValue.slice(0, 4));

  let departureDay = Number(departureDateValue.slice(8, 10));
  let departureMonth = Number(departureDateValue.slice(5, 7));
  let departureYear = Number(departureDateValue.slice(0, 4));

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

  if (mode == 'mask'){
    departureDateInput.min = departureDateMask;
    departureDateInput.value = departureDateMask;
  } else if (mode == 'validation'){
    if (checkInYear >= currentYear) {
      if (checkInMonth >= currentMonth) {
        if (checkInDay >= currentDay) {
          if (departureYear == checkInYear) {
            if (departureMonth == checkInMonth) {
              if (departureDay > checkInDay) {
                return (true)
              } else return(false)
            } else if (departureMonth > checkInMonth) {
              return(true)
            } else return(false)
          } else if (departureYear > checkInYear) {
            return(true)
          } else return(false)
        } else return(false)
      } else return(false)
    } else return(false)
  }
}*/

//Send form section
/*async function submitForm(event) {
  event.preventDefault();
  const form = event.target; //document.querySelector
  const formBtn = document.getElementById('order-button');
  const formSendResult = document.querySelector('.form__send-result');
  formSendResult.textContent = '';

  // Получение данных из формы
  const formData = new FormData(form);
  const formDataObject = {};

  formData.forEach((value, key) => {
      formDataObject[key] = value.trim().replace(/\s+/g, ' ');
  });

  // Валидация полей на клиенте
  const validationErrors = validateForm(formDataObject);

  // Обновление интерфейса для отображения ошибок
  displayErrors(validationErrors);
  if (validationErrors.length > 0) return;

  // Отправка формы на бэк
  sendFormData(form, formBtn, formSendResult, formDataObject);
}


async function sendFormData(form, formBtn, formSendResult, formDataObject) {

  try {
      formBtn.textContent = 'Отправка...';
      formBtn.disabled = true;

      const response = await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
          formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
          form.reset();
      } else if (response.status === 422) {
          const errors = await response.json();
          console.log(errors);
          throw new Error('Ошибка валидации данных');
      } else {
          throw new Error(response.statusText);
      }

  } catch (error) {
      console.error(error.message);
      formSendResult.textContent = 'Письмо не отправлено! Попробуйте позже.';
      formSendResult.style.color = 'red';

  } finally {
      formBtn.textContent = 'Отправить';
      formBtn.disabled = false;
  }
}

function validateForm(formData) {
  const { name, email, phone, checkInDate, departureDate, guestsQuantity, roomCategory } = formData;

  //const phoneRegex = /^\+[0-9]{5,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = [];

  if (!name) {
      errors.push({ field: 'name', message: 'Пожалуйста, введите ваше ФИО.' });
  } else if (name.length < 2 || name.length > 35) {
      errors.push({ field: 'name', message: 'Пожалуйста, введите корректные данные. Пример: Быков Иван Петрович' });
  }

  if (!phone) {
      errors.push({ field: 'phone', message: 'Пожалуйста, введите номер телефона.' });
  } else if (phone.length < 11) { //else if (!phoneRegex.test(phone)) {
      errors.push({ field: 'phone', message: 'Пожалуйста, введите корректный номер телефона. Пример: +7 (123) 456-78-90' });
  }

  if(!checkInDate) {
    errors.push({ field: 'checkInDate', message: 'Пожалуйста, введите дату заезда.' });
  } else if (depDateMaskValid('validation') == false) {
    errors.push({ field: 'departureDate', message: 'Пожалуйста, введите корректные даты заезда и выезда.' });
  }

  if(!departureDate) {
    errors.push({ field: 'departureDate', message: 'Пожалуйста, введите дату выезда.' });
  } else if (depDateMaskValid('validation') == false) {
    errors.push({ field: 'departureDate', message: 'Пожалуйста, введите корректные даты заезда и выезда.' });
  }

  if(!guestsQuantity) {
    errors.push({ field: 'guestsQuantity', message: 'Пожалуйста, введите общее количество гостей.' });
  } else if (guestsQuantity.length < 1) {
    errors.push({ field: 'guestsQuantity', message: 'Пожалуйста, введите корректное количество гостей.' });
  }

  if(!roomCategory) {
    errors.push({ field: 'roomCategory', message: 'Пожалуйста, выберите категорию номера.' });
  }

  if (!email) {
      errors.push({ field: 'email', message: 'Пожалуйста, введите адрес электронной почты.' });
  } else if (!emailRegex.test(email) || (email.length < 5 || email.length > 100)) {
      errors.push({ field: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты. Пример: example@mail.ru' });
  }
  
  return errors;
}

function displayErrors(errors) {
  // Скрытие всех ошибок перед отображением новых
  const errorElements = document.querySelectorAll('.form__error');
  errorElements.forEach((errorElement) => {
      errorElement.textContent = '';
  });

  if(errors.length < 1) return;

  // Отображение ошибок для соответствующих полей
  errors.forEach((error) => {
      const { field, message } = error;
      const errorElement = document.querySelector(`[data-for="${field}"]`);
      errorElement.textContent = message;
  });
}*/