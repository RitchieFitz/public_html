<?php
	
	$firstName = $_POST["first"];
	$lastName = $_POST["last"];
	$address = $_POST["address"];
	$phone = $_POST["phone"];
	$creditType = $_POST["credit-type"];
	$cardNumber = $_POST["card-number"];
	$month = $_POST["month"];
	$year = $_POST["year"];
	$products = $_POST["product"];

	buildPage($firstName, $lastName,$address,$phone,$creditType,$cardNumber,$month,$year,$products);

	function buildPage($firstName, $lastName,$address,$phone,$creditType,$cardNumber,$month,$year,$products) {
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
					<h1>Checkout Purchase</h1>
					<div class="transaction">
						<h2>Personal Information</h2>
						<div class="first-name">
							<p><span class="label">First Name:</span> <?php echo $firstName; ?></p>
						</div>
						<div class="last-name">
							<p><span class="label">Last Name:</span> <?php echo $lastName; ?></p>
						</div>
						<div class="address">
							<p><span class="label">Address:</span> <?php echo $address; ?></p>
						</div>
						<div class="phone">
							<p><span class="label">Phone:</span> <?php echo $phone; ?></p>
						</div>
						<h2>Billing Information</h2>
						<div class="credit-type">
							<p><span class="label">Credit Card:</span> <?php echo $creditType; ?></p>
						</div>
						<div class="card-number">
							<p><span class="label">Card Number:</span> <?php echo $cardNumber; ?></p>
						</div>
						<div class="expiration">
							<p><span class="label">Expiration Date:</span> <?php echo displayExpiration($month, $year); ?></p>
						</div>
						<h2>Order</h2>
						<div class="products">
							<?php echo displayProducts($products); ?>
						</div>
						
						<form action="assign10_a.php" method="POST">
							<input type="submit" name="confirm" value="Confirm">
							<input type="submit" name="cancel" value="Cancel">
						</form>
					</div>
				</div>
			</div>
		</body>
	</html>
<?php
	}

	function displayExpiration($month, $year) {
		$dateTime = DateTime::createFromFormat("!m", $month);
		$month = $dateTime->format("F");
		return $month . " " . $year;
	}

	function displayProducts($products) {
		$productList = "";
		$total = 0;

		foreach ($products as $product) {
			$productInfo = explode("::", $product);
			$productList .= "<p><span class='label'>" . $productInfo[0] . ":</span> $" . $productInfo[1] . "</p>";
			$total += (int) $productInfo[1];
		}

		$productList .= "<p class='total'><span class='label'>Total:</span> <span class='price'>$" . $total . "</span></p>";

		return $productList;
	}
?>