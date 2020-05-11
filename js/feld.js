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
	this.setCards=function(card)
	{
		cards.push(card);
		// toDo: bild dem feld hinzufügen (eigentlich view aufgabe)
		// welches bild wenn 2 Karten auf ein feld gespielt wurden?
	}
	this.setFigur=function(fi)
    {
        // die figur muss das feld (feldId) erben, weil child nicht auf parent zugreifen kann
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
	//this.figur=figur;
    this.empty = empty;
    //gibt ein Array zurück, da mehrere Figuren auf einem Feld stehen können
    this.getFigur = function () {
        return figur;
    }
	
	// functions
	this.removeCard=function(card)
	{
		removeE(cards, card);
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
    this.setFeldId = function (_feldId) {
        this.feldId = _feldId;
    }
    this.setName = function (nam) {
        this.name = nam;
        this.type = nam.substring(0, 1);
        this.color = nam.substring(1, 2);
        var prefix = "img/svg/";
        var suffix = ".svg";
        this.img = prefix + nam + suffix;
        // figuren id nötig weil 2 figuren auf einem feld stehen können?!
        this.id = Math.random().toString(36).substr(2, 9);
    }
    // toDo zuggenerator/zuglogic fehlt
    this.setMoves = function () {
        // ganze figur wird übergeben
        this.moves = someMoveFunction(this);
    }

    this.setCards = function (card) {
        cards.push(card);
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
    //console.log(figur.name + " steht auf " + figur.feldId);

    return ["e2-e3", "e2-e4"];
}

var cardRequest = loadJSON("https://raw.githubusercontent.com/megaman7de/KartenSchach/master/files/cards.json");
var alleKarten;
cardRequest.onload = function () {
    alleKarten = cardRequest.responseText;
    // ab hier kann man auf die karten zugreifen
}
/*tests
var fig = new figur("Rw");
fig.setName("Kw");
var fig2 = new figur("Qb");
var c = new card(11);
var c2 = new card(22);
fig.setCards(c);
fig.setCards(c2);
//fig.removeCard(c);


var fel = new feld("a1");
fel.setCards(new card(5));
fel.setFigur(fig);
fel.setFigur(fig2);
//fel.removeFigur(fig);
var figuren = fel.getFigur();
fig.setMoves();
var m = fig.moves;
//console.log(m);
var m2 = fig;
console.log(fel.getFigur()[0].cards[0].title_de);
console.log("neuer test; " + m2.name + " steht auf " + m2.feldId);

allgemeine tests
function a(name) {
    var name = "";
    var b = "placeholder";

    this.setName = function (na) {
        this.name = na;
    }
    this.getName = function () {
        return this.name;
    }

    this.setB = function (bl) {
        this.b = bl;
    }
    this.getB = function () {
        return this.b;
    }
}

function b(nam) {
    var name = "";
    var c = 42;

    this.setName = function (na) {
        this.name = na;
    }

    this.c = c;
    this.name = nam;
}
var t1 = new b("child");
var t2 = new a("parent");
t2.setName("Toni");
t2.setB(t1);
console.log(t2.getB().name);*/