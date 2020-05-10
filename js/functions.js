// wandelt 1,2,3 zu a,b,c
// deprecated; durch kToId ersetzt
function xr(n)
{
	return String.fromCharCode(96+n);
}

// gibt ein elementbyid oder elementsby tagname zur�ck
function g(id)
{
	// ElementsByTagName holen
	if(id==="tr" || id==="td" || id==="img")
	{
		return document.getElementsByTagName(id);
	}
	var element=document.getElementById(id);
	if(element==undefined)
	{
		alert("Error: Element not found");
	}
	else
	{
		return element;
	}
}

// id zu Koordinaten
// wandelt a1 in [1,1] um; b3 in [2,3] 
function idToK(id)
{
	var res=new Array(2);
	res[0]=id.charCodeAt(0)-96;
	res[1]=parseInt(id.substring(1,2));
	
	return res;
}

// Koordinaten zu id
// wandelt 1,1 zu a1; 2,4 zu b4
function kToId(x, y)
{
	var res=String.fromCharCode(96+x);
	res+=y;
	
	return res;
}

// l�scht ein element aus einem array
function removeE(arr, e) {
    var index = arr.indexOf(e);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// erstellt einen http-request und gibt diesen zur�ck
function loadJSON(url) {
    var xmlHttp = null;
    var res = undefined;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        alert("Error: http-request not supportet")
    }
    if (xmlHttp) {
        xmlHttp.open('GET', url, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
               // res = xmlHttp.responseText;
            }
        };
        xmlHttp.send(null);
    }
    return xmlHttp;
}

//x ms warten
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

/* gibt ein elementby id zur�ck bezogen auf dieses Object
Object.prototype.g = function(id)
{
	console.log(this.getElementById(id));
	return this.getElementById(id);
}*/
