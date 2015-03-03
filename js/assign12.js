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
	var nodeMess = node.nextSibling;

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
 * VALIDATE
 * This validates the fields to be sure there are no errors before we
 * submit.
 *************************************************************************/
 function validate() {

	// Grab all text fields
	var textInputs = $("[type*=text]");

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
	if ($("input[type*=radio]:checked").length < 1) {
		var message = $(".second .align-top")[0];

		addClass(message, "error");
		changeContent(message, "Error: must choose skill level");

		return false;
	}

	if ($("input[type*=checkbox]:checked").length < 1) {
		var message = $(".fourth .align-top")[0];

		addClass(message, "error");
		changeContent(message, "Error: must choose an instrument");

		return false;
	}

	// Make sure there are no errors.
	if ($(".error").length > 0) {
		return false;
	}

	return true;
}

function settings() {
	var textInputs = $("input[type*=text]");
	console.log(textInputs);
	for (i in textInputs) {
		conosole.log(textInputs[i]);
		textInputs[i].addEventListener("change", function () {
			checkForText(this);
		});
	}
}

/*************************************************************************
 * MAIN
 * Run when page loads.
 *************************************************************************/
 function main()
 {
	// Set focus on APR when page loads.
	document.getElementById("first_name_1").focus();
	settings();
}