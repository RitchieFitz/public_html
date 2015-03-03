<?php
	$confirm = $_POST["confirm"];
	$cancel = $_POST["cancel"];
	$message = "";

	if ($confirm) {
		$message = "Confirmed";
	}
	else if ($cancel){
		$message = "Canceled";
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta>
	<title></title>
	<link rel="stylesheet" href="../css/template.css">
	<link rel="stylesheet" href="../css/assign05.css">
	<link rel="stylesheet" href="../css/assign10.css">
</head>
<body>
	<div class="body-wrapper">
		<div class="module">
			<h1>Order Status</h1>
			<h2>Your Order Has Been <?php echo $message; ?></h2>
		</div>
	</div>
</body>
</html>