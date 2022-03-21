<?php
$name = $_POST['youname1'];
$phone = $_POST['youphone1'];

$to = 'tehtrans21@mail.ru';
$from = 'begettest@'.$_SERVER['HTTP_HOST'];
$subject = 'Вам оставили заявку на обратный звонок с сайта!!!';
$message = 'Вам оставили заявку на обратный звонок с сайта! Читайте ниже:';

$boundary = '---';
$headers = "From: $from\nReply-To: $from\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
$headers .= "MIME-Version: 1.0";
$body = "--$boundary\n";
$body .= $message."\n";
$body .= "--$boundary\n";
$body .= ''."\n";
$body .= $name. ' оставил заявку на обратный звонок!'."\n";
$body .= 'Его телефон: '. $phone."\n";
$body .= ''."\n";

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
