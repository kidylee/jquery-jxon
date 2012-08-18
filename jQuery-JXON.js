(function($) {
	var jxon = {
		
		createXML : function (oObjTree) {
			
		  function loadObjTree (oParentEl, oParentObj) {
			
		    var vValue, oChild;
		    if (oParentObj instanceof String || oParentObj instanceof Number || oParentObj instanceof Boolean) {
		      oParentEl.appendChild(oNewDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 */
		    } else if (oParentObj.constructor === Date) {	
				
		      oParentEl.appendChild(oNewDoc.createTextNode(oParentObj.toGMTString()));    
			
		    }
		    for (var sName in oParentObj) {
			
		      if (isFinite(sName)) { continue; } /* verbosity level is 0 */
		      vValue = oParentObj[sName];
		      if (sName === "keyValue") {
		        if (vValue !== null && vValue !== true) { oParentEl.appendChild(oNewDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue))); }
		      } else if (sName === "keyAttributes") { /* verbosity level is 3 */
		        for (var sAttrib in vValue) { oParentEl.setAttribute(sAttrib, vValue[sAttrib]); }
		      } else if (sName.charAt(0) === "@") {
		        oParentEl.setAttribute(sName.slice(1), vValue);
		      } else if (vValue.constructor === Array) {
		        for (var nItem = 0; nItem < vValue.length; nItem++) {
		          oChild = oNewDoc.createElement(sName);
		          loadObjTree(oChild, vValue[nItem]);
		          oParentEl.appendChild(oChild);
		        }
		      } else {
		        oChild = oNewDoc.createElement(sName);
		        if (vValue instanceof Object) {
		          loadObjTree(oChild, vValue);
		        } else if (vValue !== null && vValue !== true) {
		          oChild.appendChild(oNewDoc.createTextNode(vValue.toString()));
		        }
		        oParentEl.appendChild(oChild);
		      }
		    }
		  }
		  const oNewDoc = document.implementation.createDocument("", "", null);
				
		  loadObjTree(oNewDoc, oObjTree);
		  return oNewDoc;
		},
		
		parseText:function(sValue) {
		  if (/^\s*$/.test(sValue)) { return null; }
		  if (/^(?:true|false)$/i.test(sValue)) { return sValue.toLowerCase() === "true"; }
		  if (isFinite(sValue)) { return parseFloat(sValue); }
		  if (isFinite(Date.parse(sValue))) { return new Date(sValue); }
		  return sValue;
		},
		
		getJXONTree : function(oXMLParent) {
		  var vResult = /* put here the default value for empty nodes! */ null, nLength = 0, sCollectedTxt = "";
		// console.log(oXMLParent)
		  if (oXMLParent.hasAttributes()) {
		    vResult = {};
		    for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
		      oAttrib = oXMLParent.attributes.item(nLength);
		      vResult["@" + oAttrib.name.toLowerCase()] = this.parseText(oAttrib.value.trim());
		    }
		  }
		if (oXMLParent.hasChildNodes()) {
		    for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
		      oNode = oXMLParent.childNodes.item(nItem);
		      if (oNode.nodeType === 4) { sCollectedTxt += oNode.nodeValue; } /* nodeType is "CDATASection" (4) */
		      else if (oNode.nodeType === 3) { sCollectedTxt += oNode.nodeValue.trim(); } /* nodeType is "Text" (3) */
		      else if (oNode.nodeType === 1 && !oNode.prefix) { /* nodeType is "Element" (1) */
		        if (nLength === 0) { vResult = {}; }
		        sProp = oNode.nodeName.toLowerCase();
		        vContent = this.getJXONTree(oNode);
		        if (vResult.hasOwnProperty(sProp)) {
		          if (vResult[sProp].constructor !== Array) { vResult[sProp] = [vResult[sProp]]; }
		          vResult[sProp].push(vContent);
		        } else { vResult[sProp] = vContent; nLength++; }
		      }
		    }
		  }

		  
		  if (sCollectedTxt) { nLength > 0 ? vResult.keyValue = this.parseText(sCollectedTxt) : vResult = this.parseText(sCollectedTxt); }
		  /* if (nLength > 0) { Object.freeze(vResult); } */
		  return vResult;
		}
	};
	
	
	$.fn.toJSON = function(){
		return jxon.getJXONTree(this.wrap('<div></div>').parent()[0]);
	};
	
	$.fn.toXML = function(json){
		// console.log(json)
		return jxon.createXML(json);
	};
	})(jQuery)
