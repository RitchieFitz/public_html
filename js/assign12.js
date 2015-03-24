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

	if ($("input[type*=checkbox]:checked").length < 1) {
		var message = $(".fourth .message")[0];

		addClass(message, "error");
		changeContent(message, "Error: must choose an instrument");

		return false;
	}

	// Make sure there are no errors.
	if ($(".error").length > 0) {
		return false;
	}

	addStudent();
}

function createArrayQuery(elementArray, arrayName)
{
	query = "";

	for (var i = 0; i < elementArray.length; i++)
	{
		query += "&" + arrayName + "=" + elementArray[i].value;
	}

	return query;
}

function addStudent()
{
	var xmlhttp = new XMLHttpRequest();

	var query = "";
	query += "type=" + $("#type")[0].value;
	query += "&first_name_1=" + $("#first_name_1")[0].value;
	query += "&last_name_1=" + $("#last_name_1")[0].value;
	query += "&student_id_1=" + $("#student_id_1")[0].value;
	query += "&skill_level=" + $("[name*=skill_level]:checked")[0].value;
	query += "&location=" + $("#location")[0].value;
	query += "&room=" + $("#room")[0].value;
	query += "&time_slot=" + $("#time_slot")[0].value;
	var instruments = createArrayQuery($("[name*=instruments]:checked"), "instruments[]");
	query += instruments;

	if ($("#first_name_2").length > 0) {
		query += "&first_name_2=" + $("#first_name_2")[0].value;
		query += "&last_name_2=" + $("#last_name_2")[0].value;
		query += "&student_id_2=" + $("#student_id_2")[0].value;
	}

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var students = xmlhttp.responseText;
			displayStudents(students);
		}
	}

	xmlhttp.open("POST", "assign12.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(query);
}

function readStudents()
{
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var students = xmlhttp.responseText;
			displayStudents(students);
		}
	}

	xmlhttp.open("POST", "assign12.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("read=true");
}

function displayStudents(students)
{
	students = students.split("\n");
	students.pop();
	
	var table = "<table> \
	<caption>Students Registered</caption> \
	<thead> \
	<tr> \
	<th>Type</th> \
	<th>First Name</th> \
	<th>Last Name</th> \
	<th>Student ID</th> \
	<th>Skill Level</th> \
	<th>Location</th> \
	<th>Room</th> \
	<th>Time Slot</th> \
	<th>Instruments</th> \
	</tr> \
	</thead> \
	<tbody>";

	for (var i = 0; i < students.length; i++)
	{
		data = students[i].split(";;;");
		studentData = data[0].split("::");
		studentInstruments = data[1].split("::");
		table += buildStudentTable(studentData, studentInstruments, data[2]);
	}

	table += "</tbody></table>";
	changeContent($(".student-list")[0], table);
}

function buildStudentTable(data, instruments, numOfStudents)
{
	var row = "<tr>";
	row += "<td>" + data[0] + "</td>";

	if (numOfStudents == "1") {
		row += "<td>" + data[1] + "</td>";
		row += "<td>" + data[2] + "</td>";
		row += "<td>" + data[3] + "</td>";
		row += "<td>" + data[4] + "</td>";
		row += "<td>" + data[5] + "</td>";
		row += "<td>" + data[6] + "</td>";
		row += "<td>" + data[7] + "</td>";
	}
	else {
		row += "<td>" + data[1] + "<br>" + data[4] + "</td>";
		row += "<td>" + data[2] + "<br>" + data[5] + "</td>";
		row += "<td>" + data[3] + "<br>" + data[6] + "</td>";
		row += "<td>" + data[7] + "</td>";
		row += "<td>" + data[8] + "</td>";
		row += "<td>" + data[9] + "</td>";
		row += "<td>" + data[10] + "</td>";
	}

	row += "<td>" + instruments.join(", ") + "</td>";
	row += "</tr>";

	return row;
}

function addSecondStudent() {
	var secondStudent = "<h3>Second Student</h3> \
	<label for='first_name_2'>First Name:</label> \
	<input type='text' name='first_name_2' id='first_name_2' onchange='checkForText(this);'> \
	<span class='message'></span> \
	<br> \
	<label for='last_name_2'>Last Name:</label> \
	<input type='text' name='last_name_2' id='last_name_2' onchange='checkForText(this);'> \
	<span class='message'></span> \
	<br> \
	<label for='student_id_2'>Student ID:</label> \
	<input type='text' name='student_id_2' id='student_id_2' onchange='checkForText(this);'> \
	<span class='message'></span>";

	changeContent($(".second-student")[0], secondStudent);
}

function autoFill() {
	$("#first_name_1")[0].value = "Ritchie";
	$("#last_name_1")[0].value = "Fitzgerald";
	$("#student_id_1")[0].value = "9834562829";
	$("#location")[0].value = "Austin";
	$("#room")[0].value = "214";
	$("#time_slot")[0].value = "8:45 PM";

	if ($("#first_name_2").length > 0) {
		$("#first_name_2")[0].value = "Hannah";
		$("#last_name_2")[0].value = "Walker";
		$("#student_id_2")[0].value = "345234578";
	}
}

function settings()
{
	var checkboxes = $("input[type=checkbox]");

	for (var i = 0; i < checkboxes.length; i++)
	{
		checkboxes[i].addEventListener("change", function () {
			var nodeMess = $(".fourth .message")[0];
			if (contains(nodeMess.className, "error"))
			{
				removeClass(nodeMess, "error");
			}

			addClass(nodeMess, "success");
			changeContent(nodeMess, "Success");
		});
	}

	$("#type")[0].addEventListener("change", function () {
		console.log(this.value);
		if (this.value == "duet") {
			addSecondStudent();
		}
		else {
			if ($(".second-student").length > 0) {
				changeContent($(".second-student")[0], "");
			}
		}
	});
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
	readStudents();
}