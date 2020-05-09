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
		// toDo: bild dem feld hinzufügen (eigentlich view aufgabe)
		// welches bild wenn 2 Karten auf ein feld gespielt wurden?
	}
	this.setFigur=function(fi)
    {
        // die figur muss das feld (feldId) erben, weil child nicht auf parent zugreifen kann
        // todo Setter feldId schreiben
        fi.setFeldId(this.id);
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
    if (_id) {
        this.setId(_id);
    }
    if (_figur) {
        this.setFigur(_figur);
    }
}

// definiert das figur-Objekt
function figur(_name)
{
    var feldId = "";
	var id = "";
	var img = "";
    var name = "";
    var type = "";
	var color = "";
	var moves = [];
	var cards = [];

    // getters
    this.id = id;
    this.img = img;
    this.name = name;
    this.type = type;
    this.color = color;
    this.feldId = feldId;
    this.moves = moves;
    this.cards = cards;

    // setters
    this.setFeldId = function (feldId) {
        this.feldId = feldId;
    }
    this.setName = function (name) {
        this.name = name;
        this.type = name.substring(0, 1);
        this.color = name.substring(1, 2);
        var prefix = "img/svg/";
        var suffix = ".svg";
        this.img = prefix + name + suffix;
        // figuren id nötig weil 2 figuren auf einem feld stehen können?!
        this.id = Math.random().toString(36).substr(2, 9);
    }
    // toDo zuggenerator/zuglogic fehlt
    this.setMoves = function () {
        // ganze figur wird übergeben
        this.moves = someMoveFunction(this);
    }

    this.setCards = function (cardId) {
        cards.push(cardId);
    }

    // functions
    this.removeCard = function (cardId) {
        removeE(cards, cardId);
    }

    // falls mit parameter aufgerufen wird
    if (_name) {
        this.setName(_name);
    }
}

//leere funktion für züge damit keine fehler kommen
function someMoveFunction(figur) {
    console.log(figur.name + " steht auf " + figur.feldId);

    return ["e2-e3", "e2-e4"];
}

// tests
var fig = new figur("Rw");
fig.setFeldId("a1");
fig.setMoves();
var m = fig.moves;
console.log(m);
