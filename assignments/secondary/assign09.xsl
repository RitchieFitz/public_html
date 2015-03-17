<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/">
		<html>
			<head>
				<title>BYU-I Students</title>
				<meta charset="utf-8" />
				<link rel="stylesheet" type="text/css" href="../../css/template.css" />
				<link rel="stylesheet" type="text/css" href="../../css/assign09.css" />
			</head>
			<body>
				<div class="body-wrapper">
					<div class="module xml-assign">
						<h1>BYU-I Students</h1>
						<div class="center">
							<table>
								<caption>Student List</caption>
								<thead>
									<tr>
										<th>First N.</th>
										<th>Middle N.</th>
										<th>Last N.</th>
										<th>City</th>
										<th>State</th>
										<th>College</th>
										<th>Department</th>
										<th>Major ID</th>
									</tr>
								</thead>
								<tbody>
									<xsl:apply-templates />
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="student">
		<tr>
			<xsl:apply-templates select="name/first" />
			<xsl:apply-templates select="name/middle" />
			<xsl:apply-templates select="name/last" />
			<xsl:apply-templates select="location/city" />
			<xsl:apply-templates select="location/state" />
			<xsl:apply-templates select="college" />
			<xsl:apply-templates select="college/department" />
			<xsl:apply-templates select="college/department/major" />
		</tr>
	</xsl:template>

	<xsl:template match="name/first|name/middle|name/last|location/city|location/state">
		<td>
			<xsl:value-of select="." />
		</td>
	</xsl:template>

	<xsl:template match="college|college/department" >
		<td>
			<xsl:value-of select="@name" />
		</td>
	</xsl:template>

	<xsl:template match="college/department/major" >
		<td>
			<xsl:value-of select="@id" />
		</td>
	</xsl:template>

</xsl:stylesheet>