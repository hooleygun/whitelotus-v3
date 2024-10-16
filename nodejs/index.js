import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { body, validationResult } from 'express-validator'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors());


// Настройка транспортера для отправки электронной почты
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});


function trimReplace(value) {
  if (typeof value === 'string') {
    return value.trim().replace(/\s+/g, ' ');
  }
  return value;
}


//name, email, phone, checkInDate, departureDate, guestsQuantity, roomCategory
// Валидация данных при обработке POST-запроса от клиента
const validateData = [
  body('name'),//.customSanitizer(trimReplace).notEmpty().withMessage('Нет ФИО.')
    //.isLength({ min: 2, max: 35 }).withMessage('ФИО должно быть 2-35 символов.'),
  body('phone'),//.customSanitizer(trimReplace).notEmpty().withMessage('Нет телефона.'),
  body('email'),//.customSanitizer(trimReplace).notEmpty().withMessage('Нет Email.')
    //.isEmail().isLength({ min: 5, max: 100 }).withMessage('Не корректный Email'),
  body('checkInDate'),
  body('departureDate'),
  body('guestsQuantity'),//.customSanitizer(trimReplace).notEmpty().withMessage('Нет гостей')
  //.isLength({ min: 1}),//.withMessage('Минимальное количество гостей 1'),
  body('roomCategory'),
];


// Обработчик POST-запроса от клиента с JSON-данными
app.post('/send-email', validateData, async (req, res) => {

  try {
    // Проверяем наличие ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, phone, email, checkInDate, departureDate, guestsQuantity, roomCategory } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL, // Адрес отправителя
      to: process.env.EMAIL,   // Адрес получателя
      subject: `Заявка от ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Дата заезда:</strong> ${checkInDate}</p>
        <p><strong>Дата выезда:</strong> ${departureDate}</p>
        <p><strong>Общее количетсво гостей:</strong> ${guestsQuantity}</p>
        <p><strong>Категория номера:</strong> ${roomCategory}</p>`,
        
    });

    res.send('Сообщение отправлено!');

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.listen(PORT, (err) => {
  if (err) {
      return console.log(err);
  }
  console.log(`Сервер запущен на порту ${PORT}`);
})
