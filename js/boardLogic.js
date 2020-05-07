// setzt eine Figur auf das Brett
// erwartet das feld (id), figur und farbe als parameter
// toDo: besser wäre erst ein Object der Figur zu haben
function setFigure(field, figure, color)
{
	var feld=document.getElementById(field);
	var fico=figure.toUpperCase().substring(0, 1) + color.toLowerCase().substring(0, 1);
	feld.style.backgroundImage="url(\"img/svg/" + fico  + ".svg\")";
	feld.style.backgroundSize="cover";
}

// baut die Ausgangsstellung des Spiels auf
function setBoard()
{
	var aufstellung=["R","N","B","Q","K","B","N","R"];
	for(var i=1;i<=8;i++)
	{
		//bauern
		setFigure(xr(i)+2, "P", "w");
		setFigure(xr(i)+7, "P", "b");
		
		setFigure(xr(i)+1, aufstellung[i-1], "w");
		setFigure(xr(i)+8, aufstellung[i-1], "b");
	}
}

// wandelt 1,2,3 zu a,b,c
function xr(n)
{
	return String.fromCharCode(96+n);
}