<?php 
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';


$name = $_POST['name'];
$phone = $_POST['phone'];
$checkInDate = $_POST['checkInDate'];
$departureDate = $_POST['departureDate'];
$guestsQuantity = $_POST['guestsQuantity'];
$roomCategory = $_POST['roomCategory'];
$email = $_POST['email'];


//$mail->SMTPDebug = 3;                               // Enable verbose debug output


$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'copernik.e@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'wheoflzpbbwvqqpb'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров


$mail->setFrom('copernik.e@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('copernik.e@yandex.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML


$mail->Subject = 'Заявка с сайта';
$mail->Body    = 'Имя: ' .$name . '<br>Телефон: ' .$phone. '<br>Дата заезда: ' .$checkInDate. '<br>Дата выезда: ' .$departureDate. '<br>Общее количество гостей: ' .$guestsQuantity. '<br>Категория номера: ' .$roomCategory. '<br>Почта: ' .$email;
$mail->AltBody = '';


if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: ../index.html');
    /*echo '<script type="text/javascript">
     document.querySelector(".form__send-result").textContent = "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.";
     </script>';*/
}
?>
