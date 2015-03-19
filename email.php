<?php
	$to = $_GET["to"];
	$from = $_GET["from"];
	$subject = $_GET["subject"];
	$message = $_GET["message"];
	$messageHtml = "
<html>
<head>
<title>New Email</title>
</head>
<body>
<h1>New Message!!</h1>
<p style='color: blue;''>$message</p>
</body>
</html>
";

	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= "From: " . $from . "\r\n";

	mail($to, $subject, $messageHtml, $headers);
?>