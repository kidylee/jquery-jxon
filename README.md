#jQuery-JXON

This plugin provides the functionality to create JSON from XML(DOM) with less lost data and vice versa.

##Convert sample
###XML
	<?xml version="1.0"?>
	<!DOCTYPE catalog SYSTEM "catalog.dtd">
	<catalog>
	  <product description="Cardigan Sweater">
	   <catalog_item gender="Men's">
	     <item_number>QWZ5671</item_number>
	     <price>39.95</price>
	     <size description="Medium">
	       <color_swatch image="red_cardigan.jpg">Red</color_swatch>
	       <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
	     </size>
	     <size description="Large">
	       <color_swatch image="red_cardigan.jpg">Red</color_swatch>
	       <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
	     </size>
	   </catalog_item>
	   <catalog_item gender="Women's">
	     <item_number>RRX9856</item_number>
	     <discount_until>Dec 25, 1995</discount_until>
	     <price>42.50</price>
	     <size description="Medium">
	       <color_swatch image="black_cardigan.jpg">Black</color_swatch>
	     </size>
	   </catalog_item>
	  </product>
	  <script type="text/javascript"><![CDATA[function matchwo(a,b) {
	    if (a < b && a < 0) { return 1; }
	    else { return 0; }
	}]]></script>
	</catalog>
###JSON
	{
	  "catalog": {
	    "product": {
	      "@description": "Cardigan Sweater",
	      "catalog_item": [{
	        "@gender": "Men's",
	        "item_number": "QWZ5671",
	        "price": 39.95,
	        "size": [{
	          "@description": "Medium",
	          "color_swatch": [{
	            "@image": "red_cardigan.jpg",
	            "keyValue": "Red"
	          }, {
	            "@image": "burgundy_cardigan.jpg",
	            "keyValue": "Burgundy"
	          }]
	        }, {
	          "@description": "Large",
	          "color_swatch": [{
	            "@image": "red_cardigan.jpg",
	            "keyValue": "Red"
	          }, {
	            "@image": "burgundy_cardigan.jpg",
	            "keyValue": "Burgundy"
	          }]
	        }]
	      }, {
	        "@gender": "Women's",
	        "item_number": "RRX9856",
	        "discount_until": new Date(1995, 11, 25),
	        "price": 42.5,
	        "size": {
	          "@description": "Medium",
	          "color_swatch": {
	            "@image": "black_cardigan.jpg",
	            "keyValue": "Black"
	          }
	        }
	      }]
	    },
	    "script": {
	      "@type": "text/javascript",
	      "keyValue": "function matchwo(a,b) {\n  if (a < b && a < 0) { return 1; }\n  else { return 0; }\n}"
	    }
	  }
	}
	
##How to use
###DOM(XML) to JSON
	$("body").toJSON()
###JSON to DOM(XML)
	$.toXML($("body").toJSON())