// definiert das Feld-Objekt
//_id und _figur sind optional
function feld(_id, _figur)
{
	var id="";
	var x=-100;
	var y=-100;
	var empty=true;
	// ids oder Objekte?
	var cards=[];
	var img="";
	// ids oder Objekte?
	var figur=[];
	
	// setters:
	this.setId=function(id)
	{
		this.id=id;
		// id übersetzen in x,y-Koordinaten
		this.x=idToK(id)[0];
		this.y=idToK(id)[1];
	}
	this.setCards=function(cardId)
	{
		cards.push(cardId);
		// toDo: bild dem feld hinzufügen
		// welches bild wenn 2 Karten auf ein feld gespielt wurden?
	}
	this.setFigur=function(fi)
	{
		figur.push(fi);
		if(figur.length>0)
		{
			this.empty=false;
		}
	}
	
	// getters
	this.cards=cards;
	this.img=img;
	this.figur=figur;
	this.empty=empty;
	
	// functions
	// evtl enthält cards nicht nur die ids sondern die Karten als Objekte
	this.removeCard=function(cardId)
	{
		removeE(cards, cardId);
	}
	this.removeFigur=function(figurId)
	{
		// toDo
		// wie ist Figur aufgebaut?
		removeE(figur, figurId);
		if(figur.length==0)
		{
			this.empty=true;
		}
	}
	
	//falls parameter übergeben worden sind
	if(_id)this.setId(_id);
	if(_figur)this.setFigur(_figur);
}

// definiert das figur-Objekt
function figur(name)
{
	var id = "";
	var img = "";
	var name = "";
	var color = "";
	var moves = [];
	var cards = [];

}

// visual studio test
