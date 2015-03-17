<?php header("Content-type: text/xml \n\n"); ?>
<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type="text/xsl" href="assign09.xsl" ?>
<!DOCTYPE studentList SYSTEM "assign09.dtd">

<!-- studentList>student*7>name>first+middle+last^location>city+state^college[name=""]>department[name="Computer Science"]>major[id=""] -->
<studentList>
	<student>
		<name>
			<first>Ritchie</first>
			<middle>Kimball</middle>
			<last>Fitzgerald</last>
		</name>
		<location>
			<city>Rexburg</city>
			<state>Idaho</state>
		</location>
		<college name="Physical Sciences and Engineering">
			<department name="Computer Science">
				<major id="440"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Richard</first>
			<middle>Paul</middle>
			<last>Henke</last>
		</name>
		<location>
			<city>Rexburg</city>
			<state>Idaho</state>
		</location>
		<college name="Physical Sciences and Engineering">
			<department name="Computer Science">
				<major id="440"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Lyle</first>
			<middle>Kendall</middle>
			<last>Palagar</last>
		</name>
		<location>
			<city>Sacramento</city>
			<state>California</state>
		</location>
		<college name="Physical Sciences and Engineering">
			<department name="Computer Information Technologies">
				<major id="340"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Christopher</first>
			<middle>William</middle>
			<last>Fitzgerald</last>
		</name>
		<location>
			<city>Rexburg</city>
			<state>Idaho</state>
		</location>
		<college name="Physical Sciences and Engineering">
			<department name="Mathematics">
				<major id="240"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Katie</first>
			<middle>Bateman</middle>
			<last>Fitzgerald</last>
		</name>
		<location>
			<city>Seattle</city>
			<state>Washington</state>
		</location>
		<college name="Agriculture and Life Sciences">
			<department name="Nursing">
				<major id="140"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Hannah</first>
			<middle>Walker</middle>
			<last>Fitzgerald</last>
		</name>
		<location>
			<city>Hays</city>
			<state>Kansas</state>
		</location>
		<college name="Language and Letters">
			<department name="English">
				<major id="540"></major>
			</department>
		</college>
	</student>
	<student>
		<name>
			<first>Carson</first>
			<middle>Keith</middle>
			<last>Lochridge</last>
		</name>
		<location>
			<city>Grand Junction</city>
			<state>Colorado</state>
		</location>
		<college name="Physical Sciences and Engineering">
			<department name="Mechanical Engineering">
				<major id="640"></major>
			</department>
		</college>
	</student>
</studentList>