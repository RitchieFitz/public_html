<?xml version="1.0" encoding="utf-8" ?>
<!-- <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml"> -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">

  <xsl:template match="bsa">
    <html>
      <head>
        <title>Boy Scouts of America</title>
        <meta charset="utf-8" />
        <link href="assign08.css" rel="stylesheet" type="text/css" />
      </head>
      <body id="body">
        <h1><big>Boy Scouts of America</big></h1>
        <xsl:apply-templates />
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
  <xsl:template match="troop">
    <table>
      <tr>
        <td colspan="8" class="tableHead">
          <big> Troop 
            <xsl:value-of select="@troopNumber" /> 
            <span><xsl:value-of select="@unitName" /></span>
          </big>
        </td>
      </tr>
      <tr>
        <td class="colHeads">First Name</td>
        <td class="colHeads">Last Name</td>
        <td class="colHeads">Phone</td>
        <td class="colHeads">Street</td>
        <td class="colHeads">City</td>
        <td class="colHeads">State</td>
        <td class="colHeads">Rank</td>
        <td class="colHeads">Merit Badges</td>
      </tr>
      <xsl:for-each select="scout">
        <xsl:sort select="lastName" />
        <tr>
          <td>
            <xsl:value-of select="firstName" />
          </td>
          <td>
            <xsl:value-of select="lastName" />
          </td>
          <td>
            <xsl:value-of select="phone" />
          </td>
          <td>
            <xsl:value-of select="address/street" />
          </td>
          <td>
            <xsl:value-of select="address/city" />
          </td>
          <td>
            <xsl:value-of select="address/state" />
          </td>
          <td>
            <select>
              <xsl:for-each select="rank" >
                <option>
                  <xsl:value-of select="current()" />
                  (<xsl:value-of select="@date-earned" />)
                </option>
              </xsl:for-each>
            </select>
          </td>
          <td>
            <select>
              <xsl:for-each select="meritbadge" >
                <option>
                  <xsl:value-of select="current()" />
                  (<xsl:value-of select="@date-earned" />)
                </option>
              </xsl:for-each>
            </select>
          </td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>
</xsl:stylesheet>
