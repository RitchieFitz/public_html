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

 function buildTable(data) {
 	var cities = [];
 	var populations = [];

 	for (i in data) {
 		if ( i % 2 == 0) {
 			cities.push(data[i].trim());
 		}
 		else
 		{
 			populations.push(data[i].trim());
 		}
 	}

 	var tableData = "<table> \
 	<caption>Country Data</caption> \
 	<thead> \
 	<tr> \
 	<th>City</th> \
 	<th>Population</th> \
 	</tr> \
 	<tbody>";

 	for (i in cities) {
 		tableData += "<tr><td>" + cities[i] + "</td><td>" + populations[i] + "</td></tr>";
 	}

 	tableData += "</tbody></table>";

 	return tableData;
 }

 function loadFile(destination, id)
 {
 	var xmlhttp;
 	if (window.XMLHttpRequest)
 	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if (id == "#country-data")
			{
				var data = xmlhttp.responseText.replace(/[\n\t]/g, '   ').split(/[ ]{3,}/g);
				var tableData = buildTable(data);
				changeContent($(id)[0], tableData);
			}
			else
			{
				changeContent($(id)[0], xmlhttp.responseText);
			}
		}
	}

	xmlhttp.open("GET", destination, false);
	xmlhttp.send();
}

function loadCountry(element)
{
	var country = element.options[element.selectedIndex].value;
	if (country == "default")
	{
		changeContent($(".country-data")[0], "");
	}
	else 
	{
		var destination = "/files/" + country;
		loadFile(destination, "#country-data");
	}
}

function loadUrl(element) {
	var destination = element.value;
	loadFile(destination, "#webpage");
}

function main()
{
	console.log("Connected and working!");
}