// wandelt 1,2,3 zu a,b,c
function xr(n)
{
	return String.fromCharCode(96+n);
}

// gibt ein elementbyid oder elementsby tagname zurück
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

/* gibt ein elementby id zurück bezogen auf dieses Object
Object.prototype.g = function(id)
{
	console.log(this.getElementById(id));
	return this.getElementById(id);
}*/
