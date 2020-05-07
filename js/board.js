// Überführt eine Tabelle in ein KartenSchachBrett
// hidden gibt an wie groß die "SpringerWelt" ist; diese Felder sind dann zunächst ausgeblendet
// @return: DOM-Tree Tabelle mit Attributen
function createBoard(table, hidden)
{
	if(table.rows.length>=8 && table.rows.length%2==0)
	{
        //richtige größe finden
        var min=Math.min(window.innerWidth,window.innerHeight);
        var size=Math.floor(min*0.8/10)*10;
        
        table.setAttribute("id","table1");
        table.setAttribute("width",size);
        table.setAttribute("height",size);
        
        // richtige startwerte für ids
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
        		
        		/* ids festlegen
        		8x8, hidden=0: links unten=a1
        		10x10, hidden=1: links unten=`0
        		12x12. hidden=2: links unten=_-1
        		
        		charCode Tabelle:
        		"95": "_", "96": "`",     "97": "a",     "98": "b"
        		*/
        		var x=String.fromCharCode(start_x+table_size-i);
        		var y=(j+start_y);
        		td.setAttribute("id",x+""+y);
        		
        		// "weiß"=#ffce9e; "schwarz"=#d18b47
        		if((x.charCodeAt(0)+y)%2==0)
        		{
        			td.setAttribute("style","background-color:#d18b47");
        		}
        		else
        		{
        			td.setAttribute("style","background-color:#ffce9e");
        		}
        		
        		// unsichtbar setzen
        		if(x.charCodeAt(0)>104 || x.charCodeAt(0)<97 || y<1 || y>8)
        		{
        			td.setAttribute("style","visibility:hidden");
        		}
        		
        	}
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