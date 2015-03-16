<?xml version="1.0" encoding="utf-8" ?>
<!-- <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml"> -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">

  <xsl:template match="/">
    <html>
      <head>
        <title>Boy Scouts of America</title>
        <meta charset="utf-8" />
        <link href="../../css/assign07.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <h1 class="center"><strong>Boy Scouts of America</strong></h1>
            <xsl:apply-templates />
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="council">
    <h2>
      <xsl:value-of select="@name" />
      Council
    </h2>
    <xsl:apply-templates />
  </xsl:template>

  <xsl:variable name="tableHeader">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Street</th>
        <th>City</th>
        <th>State</th>
        <th>Rank</th>
        <th>Merit Badges</th>
      </tr>
    </thead>
  </xsl:variable>

  <xsl:template match="troop">
    <table>
      <caption>
        Troop 
        <xsl:value-of select="@troopNumber" />&#160;<xsl:value-of select="@unitName" />
      </caption>
      <xsl:copy-of select="$tableHeader" />
      <tbody>
        <xsl:apply-templates>
          <xsl:sort select="lastName" />
        </xsl:apply-templates>
      </tbody>
    </table>
  </xsl:template>

  <xsl:template match="scout">
    <tr>
      <xsl:apply-templates select="firstName" />
      <xsl:apply-templates select="lastName" />
      <xsl:apply-templates select="phone" />
      <xsl:apply-templates select="address/street" />
      <xsl:apply-templates select="address/city" />
      <xsl:apply-templates select="address/state" />
      <td>
        <select>
          <xsl:apply-templates select="rank" />
        </select>
      </td>
      <td>
        <select>
          <xsl:apply-templates select="meritbadge" />
        </select>
      </td>
    </tr>
  </xsl:template>

  <xsl:template 
    match="firstName|lastName|phone|address/street|address/city|address/state">
    <td>
      <xsl:value-of select="." />
    </td>
  </xsl:template>

  <xsl:template match="rank|meritbadge">
    <option>
      <xsl:value-of select="." />
      (<xsl:value-of select="@date-earned" />)
    </option>
  </xsl:template>

</xsl:stylesheet>
