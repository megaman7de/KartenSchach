// setzt eine Figur auf das Brett
// erwartet das feld (id), figur und farbe als parameter
// toDo: besser wäre erst ein Object der Figur zu haben
function setFigure(field, figure, color)
{
	var feld_=g(field);
	var fico=figure.toUpperCase().substring(0, 1) + color.toLowerCase().substring(0, 1);
	feld_.style.backgroundImage="url(\"img/svg/" + fico  + ".svg\")";
	feld_.style.backgroundSize="cover";
}

// baut die Ausgangsstellung des Spiels auf
function setBoard()
{
	// zuerst alles löschen
	clearBoard("table1");

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

// löscht alle Figuren vom Brett
function clearBoard(field)
{
	var feld_=g(field);
	var trs=feld_.getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++)
    {
        var tds=trs[i].getElementsByTagName("td");
        // spalten durch gehen
    	for(var j=0;j<tds.length;j++)
    	{
    		tds[j].style.backgroundImage="";
    	}
    }
}