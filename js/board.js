// �berf�hrt eine Tabelle in ein KartenSchachBrett
// hidden gibt an wie gro� die "SpringerWelt" ist; diese Felder sind dann zun�chst ausgeblendet
// @return: DOM-Tree Tabelle mit Attributen
function createBoard(hidden)
{
	// Grundtabelle erstellen
	var table=createTable(8+2*hidden);

    //richtige gr��e finden
    var min=Math.min(window.innerWidth,window.innerHeight);
    var size=Math.floor(min*0.9/10)*10;
    
    table.setAttribute("id","table1");
    table.setAttribute("width",size);
    table.setAttribute("height",size);
    
    // richtige startwerte f�r ids
    var start_x="a".charCodeAt(0)-hidden;
    var start_y=1-hidden;
    
    var trs=table.getElementsByTagName("tr");
    var table_size=trs.length-1;
    // zeilen durchgehen
    for(var i=0;i<trs.length;i++)
    {
        var tds=trs[i].getElementsByTagName("td");
        // spalten durch gehen
        for(var j=0;j<tds.length;j++)
        {
            var td=tds[j];
            
            /* 	ids festlegen
                8x8, hidden=0: links unten=a1
                10x10, hidden=1: links unten=`0
                12x12. hidden=2: links unten=_-1
                
                charCode Tabelle:
                "95": "_", "96": "`", "97": "a", "98": "b"
            */
            var x=String.fromCharCode(start_x+j);
            var y=start_y+(table_size-i);
            td.setAttribute("id",x+""+y);
            
            // "wei�"=#ffce9e; "schwarz"=#d18b47
            if((x.charCodeAt(0)+y)%2==0)
            {
                td.style.backgroundColor = blackFieldColor;
            }
            else
            {
                td.style.backgroundColor = whiteFieldColor;
            }
            
            // unsichtbar setzen
            if(x.charCodeAt(0)>104 || x.charCodeAt(0)<97 || y<1 || y>8)
            {
                td.style.visibility="hidden";
            }
            
            // javascript onClick vorbereiten
            td.setAttribute("onClick","javascript:someFunction(\"" + td.getAttribute("id") + "\");");           
        }
    }
	return table;
}

// erstellt eine Tabelle (n x n)
// @return: DOM-Tree Tabelle
function createTable(n)
{
	var table=document.createElement("table");
	
	// erzeuge zeilen
	for(var i=0;i<n;i++)
	{
		var tr=document.createElement("tr");
		//erzeuge spalten
		for(var j=0;j<n;j++)
		{
			var td=document.createElement("td");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
}

// leere Funktion f�r sp�ter damit es jetzt keine fehler gibt
function someFunction(sender)
{
    console.log("sf: " + sender);
    delegate2(sender);
}