async function submitForm(event) {
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
  }

  if(!departureDate) {
    errors.push({ field: 'checkInDate', message: 'Пожалуйста, введите дату выезда.' });
  }

  if(!guestsQuantity) {
    errors.push({ field: 'checkInDate', message: 'Пожалуйста, введите общее количество гостей.' });
  }

  if(!roomCategory) {
    errors.push({ field: 'checkInDate', message: 'Пожалуйста, выберите категорию номера.' });
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
}