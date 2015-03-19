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

function getXmlData(xmlDoc, tagName, multiple)
{
	if (multiple)
	{
		var valueArray = [];
		var elementArray = xmlDoc.getElementsByTagName(tagName);

		for (var i = 0; i < elementArray.length; i++)
		{
			valueArray[i] = elementArray[i].childNodes[0].nodeValue;
		}

		return valueArray;

	}
	else
	{
		return xmlDoc.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
	}
}

function buildMileageDiv(startCity, startState, endCity, endState, miles, modes)
{
	changeContent($("#startCityV")[0], startCity);
	changeContent($("#startStateV")[0], startState);
	changeContent($("#endCityV")[0], endCity);
	changeContent($("#endStateV")[0], endState);
	changeContent($("#modesV")[0], modes.join(", "));
	changeContent($("#milesV")[0], miles + " Miles");
}

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

	console.log("Query Url: " + url + query);

	// Uncomment to test locally
	// var resultXML = "";
	// resultXML += "<trip>";
	// resultXML += "<startcity>Miami</startcity>";
	// resultXML += "<startstate>FL</startstate>";
	// resultXML += "<endcity>Chicago</endcity>";
	// resultXML += "<endstate>IL</endstate>";
	// resultXML += "<miles>1377</miles>";
	// resultXML += "<tmode>Plane</tmode>";
	// resultXML += "<tmode>Car</tmode>";
	// resultXML += "<tmode>Bus</tmode>";
	// resultXML += "<tmode>Bike</tmode>";
	// resultXML += "<tmode>Foot</tmode>";
	// resultXML += "</trip>";

	// This will all be in the ajax if statement.
	// -------------------------------------------
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var parser = new DOMParser();
			// var xmlDoc = parser.parseFromString(resultXML,"text/xml"); // Uncomment to test locally
			var xmlDoc = xmlhttp.responseXML;
			// var xmlDoc = parser.parseFromString(xmlhttp.responseXML,"text/xml");
			console.log(xmlDoc.getElementsByTagName("startcity")[0].innerHtml);

			var startCityV = getXmlData(xmlDoc, "startcity", false);
			var startStateV = getXmlData(xmlDoc, "startstate", false);
			var endCityV = getXmlData(xmlDoc, "endcity", false);
			var endStateV = getXmlData(xmlDoc, "endstate", false);
			var milesV = getXmlData(xmlDoc, "miles", false);
			var modesV = getXmlData(xmlDoc, "tmode", true);

			console.log("startCityV: " + startCityV);
			console.log("startStateV: " + startStateV);
			console.log("endCityV: " + endCityV);
			console.log("endStateV: " + endStateV);
			console.log("milesV: " + milesV);
			console.log("modesV: " + modesV);

			buildMileageDiv(startCityV, startStateV, endCityV, endStateV, milesV, modesV);
		}
	}
	xmlhttp.open("GET","ajax_info.txt",true);
	xmlhttp.send();

	// -------------------------------------------
	// var resultXML = xmlhttp.responseXML;
	// var finalResult = parseXml(resultXML); // TODO RIGHT HERE

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