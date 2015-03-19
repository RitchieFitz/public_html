/*************************************************************************
 * $
 * This lets me select any element by using a CSS query.
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
	var elements = $("input[type*=text]:enabled");

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

	// Clears whatever value was in the Monthly Payment section.
	// changeContent($("#payment")[0], "");
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

	console.log(nodeMess);

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
	nodeMess.style.right = (nodeMess.offsetWidth * -1) - 10 + "px";

	setTimeout( function()
	{
		nodeMess.style.right = "-" + (nodeMess.offsetWidth + 10) + "px";
	}, 10);
}

/*************************************************************************
 * IS EMPTY
 * If input element is empty it notifies user that field needs to be filled
 * out and returns true. If there is a value it returns false.
 *************************************************************************/
function isEmpty(element)
{
	if (element.value == "")
	{
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
		return true;
	}
	else
	{
		return false;
	}
}

/*************************************************************************
 * UPDATE
 * This checks the inputs and make sure they are not empty or contain any
 * errors before updating.
 *************************************************************************/
 function update()
 {

	// Input Classes
	var startCity = $("#startCity")[0].className;
	var startState = $("#startState")[0].className;
	var endCity = $("#endCity")[0].className;
	var endState = $("#endState")[0].className;

	if (isEmpty($("#startCity")[0])) return;
	if (isEmpty($("#startState")[0])) return;
	if (isEmpty($("#endCity")[0])) return;
	if (isEmpty($("#endState")[0])) return;

	// Check if any fields contain any errors.
	if (!contains(startCity, "error") && !contains(startState, "error") && !contains(endCity, "error") && !contains(endState, "error"))
	{
		getMileage();
	}
	else
	{
		console.log("Fix Errors");
	}
}

/*************************************************************************
 * CHECK UPDATE
 * This will update monthly payment only if all input fields are filled.
 *************************************************************************/
function checkUpdate()
{
	// Collect input fields.
	var inputs = $("#startCity, #startState, #endCity, #endState");

	// Make sure they all contain values.
	if (inputs[0].value != "" && inputs[1].value != "" && inputs[2].value != "" && inputs[3].value != "")
	{
		update();
	}
}

/*************************************************************************
 * CHECK INPUT
 * This validates the input field, and will update the input status
 * accordingly.
 *************************************************************************/
 function checkInput(element)
 {
	// Make sure the value is a numeric value, and that it is not
	// empty.
	if (isNaN(element.value) == true)
	{
		inputStatus(element, "error", "Error: contains non-digit");
	}
	else if (element.value == "")
	{
		inputStatus(element, "error", "Error: cannot leave empty");
		element.focus();
	}
	else {
		inputStatus(element, "success", "Success");
	}

	// This will update the monthly payment if all fields are filled in
	// and don't contain any errors.
	checkUpdate();
}

/**
 * GET XML DATA
 * This will select the XML element we want by tagname and return the
 * content contained in the element.
 * 
 * @param  {[XML DOC]} xmlDoc   The XML document we want to pull data from.
 * @param  {[String]}  tagName  The tag name of the element we want.
 * @param  {[boolean]} multiple Tells us to grab an array of data.
 * @return {[string]}                   the content of the element.
 * @return {[array of string]}          an array of strings containing content.
 */
function getXmlData(xmlDoc, tagName, multiple)
{
	// Check if we need to grab multiple values or not.
	if (multiple)
	{
		var valueArray = [];

		// Get the array of elements.
		var elementArray = xmlDoc.getElementsByTagName(tagName);

		// Loop through and push the new content onto the array.
		for (var i = 0; i < elementArray.length; i++)
		{
			valueArray[i] = elementArray[i].childNodes[0].nodeValue;
		}

		// Return an array of strings containing the elements contents.
		return valueArray;

	}
	else
	{
		// Return the content from the matching code name.
		return xmlDoc.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
	}
}

/**
 * DISPLAY DATA
 * This adds the data to the html document so the user can see the data.
 * 
 * @param  {[String]} startCity  The value of startCity.
 * @param  {[String]} startState The value of startState.
 * @param  {[String]} endCity    The value of endCity.
 * @param  {[String]} endState   The value of endState.
 * @param  {[String]} miles      The value of miles.
 * @param  {[Array]}  modes      The value of modes.
 */
function displayData(startCity, startState, endCity, endState, miles, modes)
{
	// Output values to correct places.
	changeContent($("#startCityV")[0], startCity);
	changeContent($("#startStateV")[0], startState);
	changeContent($("#endCityV")[0], endCity);
	changeContent($("#endStateV")[0], endState);
	changeContent($("#modesV")[0], modes.join(", "));
	changeContent($("#milesV")[0], miles + " Miles");
}

/**
 * GET MILEAGE
 * This function sends a query to the mileage program and when we get the results
 * back we send them to displayData() so that the user can see the data.
 */
function getMileage()
{
	var xmlhttp = new XMLHttpRequest();

	// Link to C++ file
	var url = "http://157.201.194.254/cgi-bin/ercanbracks/mileage/mileageAjaxXML";

	// Use this to build our GET query.
	var query = "";

	// Get the values from the form.
	var startCity = $("#startCity")[0].value;
	var startState = $("#startState")[0].value;
	var endCity = $("#endCity")[0].value;
	var endState = $("#endState")[0].value;

	// Build Query.
	query += "?startCity=" + startCity + "&startState=" + startState + "&endCity=" + endCity + "&endState=" + endState;
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			// Get data back as XML
			var xmlDoc = xmlhttp.responseXML;

			// Get values for each variable.
			var startCityV = getXmlData(xmlDoc, "startcity", false);
			var startStateV = getXmlData(xmlDoc, "startstate", false);
			var endCityV = getXmlData(xmlDoc, "endcity", false);
			var endStateV = getXmlData(xmlDoc, "endstate", false);
			var milesV = getXmlData(xmlDoc, "miles", false);
			var modesV = getXmlData(xmlDoc, "tmode", true);

			// Display the data.
			displayData(startCityV, startStateV, endCityV, endStateV, milesV, modesV);
		}
	}

	xmlhttp.open("GET", url + query, true);
	xmlhttp.send();
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
 * MAIN
 * Run when page loads.
 *************************************************************************/
function main()
{
	// Set focus on APR when page loads.
	$("#startCity")[0].focus();
}