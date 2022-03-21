<?php
$name1 = $_POST['youname1'];
$phone = $_POST['youphone1'];

$name2 = $_POST['youname2'];
$pochta = $_POST['youemail'];
$message1 = $_POST['youmessage'];

$to = 'romanivanov91@yandex.ru';
$from = 'begettest@'.$_SERVER['HTTP_HOST'];
$subject = 'Вам пришло сообщение с сайта';
$message = 'Вам пришло сообщение с сайта! Читайте ниже:';

$boundary = '---';
$headers = "From: $from\nReply-To: $from\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
$headers .= "MIME-Version: 1.0";
$body = "--$boundary\n";
$body .= $message."\n";
$body .= "--$boundary\n";
$body .= ''."\n";
$body .= $name1. ' оставил(а)  заявку на обратный звонок!'."\n";
$body .= 'Его телефон: '. $phone."\n";
$body .= ''."\n";
$body .= $name2. ' оставил(а) вам сообщение.'."\n";
$body .= 'Его E-mail: '. $pochta."\n";
$body .= 'Сообщение: '. $message1."\n";


$filename = basename(__FILE__);
$file = fopen($filename, "r"); //Открываем файл
$text = fread($file, filesize($filename)); //Считываем весь файл
fclose($file); //Закрываем файл

if (mail($to, $subject, $body, $headers,"-f{$from}")): return false;
else: return true;
endif;
//if(mail($to, $subject, $body, $headers,"-f{$from}")->send()) {
//    return true;
//} else {
//    return false;
//}

//if (mail($to, $subject, $body, $headers,"-f{$from}")): echo 'sent';
//else: echo 'not sent';
//endif;
//}
//else
//{
?>
