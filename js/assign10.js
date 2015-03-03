/*************************************************************************
 * $
 * This lets me select any element by using CSS selectors.
 *************************************************************************/
 function $(selector)
 {
 	return document.querySelectorAll(selector);
 }

/*************************************************************************
 * ADD CLASS
 * This adds a class to the passed in element.
 *************************************************************************/
 function addClass(element, newClass)
 {
 	element.className = element.className + " " + newClass;
 }

/*************************************************************************
 * REMOVE CLASS
 * This removes a class to the passed in element.
 *************************************************************************/
 function removeClass(element, deleteClass)
 {
 	var reg = new RegExp(" " + deleteClass,"g");
 	element.className = element.className.replace(reg, '');
 }

/*************************************************************************
 * CHANGE CONTENT
 * This changes the html content of the passed in element.
 *************************************************************************/
 function changeContent(element, message)
 {
 	element.innerHTML = message;
 }

/*************************************************************************
 * CONTAINS
 * This searches for a substring in string.
 *************************************************************************/
 function contains(str, substr)
 {
 	return str.indexOf(substr) > -1;
 }

/*************************************************************************
 * CLEAR CHECKS
 * This removes all success and error classes from form. It also removes
 * all messages letting the user start from the beginning.
 *************************************************************************/
 function clearChecks()
 {
	// This will select all enabled inputs.
	var elements = $("form input[type*=text]:enabled, form textarea");

	// Remove success or error from each element.
	for (i = 0; i < elements.length; i++)
	{
		if (contains(elements[i].className, "success"))
		{
			removeClass(elements[i], "success");
		}
		else if (contains(elements[i].className, "error"))
		{
			removeClass(elements[i], "error");
		}
	}

	// This selectes all message elements.
	var messages = $(".message");

	// This will remove the content in each message element.
	for (i = 0; i < messages.length; i++)
	{
		changeContent(messages[i], "");
	}
}

/*************************************************************************
 * INPUT STATUS
 * This allows us to notify the user if their input was successful or not.
 * Pass in the element to effect, type of message, and then the actual
 * message.
 *************************************************************************/
 function inputStatus(node, type, message)
 {
	// This gets the message element that matches the input node.
	var nodeMess = node.nextSibling.nextSibling;

	// Add error class or success class if it wasn't already set.
	// Change only if messages are different for error class.
	if (type == "error" && message != nodeMess.innerHTML)
	{
		// Remove success class if it exists.
		if (contains(node.className, "success"))
		{
			removeClass(node, "success-input");
			removeClass(nodeMess, "success");
		}

		addClass(node, "error-input");
		addClass(nodeMess, "error");
		changeContent(nodeMess, message);
	}
	else if (type == "success" && !contains(node.className, "success"))
	{
		// Remove error class if it exists.
		if (contains(node.className, "error"))
		{
			removeClass(node, "error-input");
			removeClass(nodeMess, "error");
		}

		addClass(node, "success-input");
		addClass(nodeMess, "success");
		changeContent(nodeMess, message);
	}

	// Position message element correctly.
	nodeMess.style.right = (nodeMess.offsetWidth * -1) - 5 + "px";

	setTimeout( function()
	{
		nodeMess.style.right = "-" + (nodeMess.offsetWidth + 5) + "px";
	}, 10);
}

/*************************************************************************
 * CHECK CARD
 * This function makes sure that the credit card field is not empty, and 
 * that it contains a 16 digit input.
 *************************************************************************/
function checkCard(element) {
	if (element.value == "")
	{
		// If field is left blank alert user.
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
	}
	else if (!/\d{16}/.test(element.value)) {
		// If field is not a 16 digit input alert user.
		inputStatus(element, "error", "Error: must contain 16 digits");
	}
	else {
		inputStatus(element, "success", "Success");
	}
}

/*************************************************************************
 * CHECK PHONE
 * This function makes sure that the phone number field is not empty, and 
 * that it matches a specified input.
 *************************************************************************/
function checkPhone(element) {
	if (element.value == "")
	{
		// If field is left blank alert user.
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
	}
	else if (!/\d{3}-\d{3}-\d{4}/.test(element.value)) {
		// If field does not match pattern alert user.
		inputStatus(element, "error", "Error: format must be 123-456-7890");
	}
	else {
		inputStatus(element, "success", "Success");
	}
}

/*************************************************************************
 * CHECK TEXT AREA
 * This function makes sure that the textarea field is not empty.
 *************************************************************************/
function checkTextarea(element) {
	if (element.value == "")
	{
		// If field is left blank alert user.
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
	}
	else {
		inputStatus(element, "success", "Success");
	}
}

/*************************************************************************
 * CHECK FOR TEXT
 * This function makes sure that the input text field is not empty.
 *************************************************************************/
function checkForText(element) {
	if (element.value == "")
	{
		// If field is left blank alert user.
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
	}
	else if (/\d/.test(element.value))
	{
		// If field contains digit alert user.
		inputStatus(element, "error", "Error: contains digit");
	}
	else {
		inputStatus(element, "success", "Success");
	}
}

/*************************************************************************
 * CHECKBOX SETTINGS
 * This function sets listeners on the checkboxes to listen for a 
 * onchange. When a checkbox changes it updates the total.
 *************************************************************************/
function checkboxSettings() {
	var sum = 0;
	
	// Get all checkboxes.
	var checkboxes = document.forms[0]["product[]"];

	for (var i = 0; i < checkboxes.length; i++) {
		
		// Check for change on each checkbox.
		checkboxes[i].addEventListener("change", function () {

			// Get all checkboxes that are selected.
			var curr_checkboxes = $(".product-table input:checked");

			// Sum the value of selected checkboxes.
			for (var i = 0; i < curr_checkboxes.length; i++) {
				var checkboxInfo = curr_checkboxes[i].value.split("::");
				sum += checkboxInfo[1] * 1;
			}

			// Update Total
			changeContent($(".price")[0], "$" + sum);

			// Set sum back to 0.
			sum = 0;

		});
	}
}

/*************************************************************************
 * RADIO SETTINGS
 * This function sets listeners on the radio buttons to listen for a 
 * onchange. When a radio button is selected we update the credit type
 * message field.
 *************************************************************************/
function radioSettings() {
	var cardTypes = $("[name*=credit-type]");
	var message = $(".credit-provider .block-message")[0];

	for (var i = 0; i < cardTypes.length; i++) {
		cardTypes[i].addEventListener("change", function () {
			addClass(message, "success");
			changeContent(message, "Success");
		});
	}	
}

/*************************************************************************
 * AUTOFILL SETTINGS
 * This autofills the personal information in the form.
 *************************************************************************/
function autoFillSettings() {
	$("#first")[0].value = "Ritchie";
	$("#last")[0].value = "Fitzgerald";
	$("#address")[0].value = "455 W. 5th S.\nRexburg, ID\n83440";
	$("#phone")[0].value = "208-881-1252";
	$("[name*=credit-type]")[1].checked = true;
	$("#card-number")[0].value = "3452137896574532";
}

/*************************************************************************
 * VALIDATE
 * This validates the fields to be sure there are no errors before we
 * submit.
 *************************************************************************/
function validate() {

	// Grab all text fields
	var textInputs = $("[type*=text], textarea");

	// Make sure text fields are not empty.
	for (var i = 0; i < textInputs.length; i++) {
		if (textInputs[i].value == "")
		{
			inputStatus(textInputs[i], "error", "Error: cannot leave empty");
			textInputs[i].focus();
			return false;
		}
	}

	// Make sure they selected a credit card type.
	if ($("[name*=credit-type]:checked").length < 1) {
		var firstType = $("[name*=credit-type]")[0];
		var message = $(".credit-provider .block-message")[0];

		addClass(message, "error");
		changeContent(message, "Error: must choose type");
		firstType.focus();

		return false;
	}

	// Make sure there are no errors.
	if ($(".error").length > 0) {
		return false;
	}

	return true;
}

/*************************************************************************
 * MAIN
 * Run when page loads.
 *************************************************************************/
 function main()
 {
	// Set focus on APR when page loads.
	document.getElementById("first").focus();
	checkboxSettings();
	radioSettings();
}