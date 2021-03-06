// definiert das Feld-Objekt
//_id und _figur sind optional
function feld(_id, _figur)
{
	var id="";
	var x=-100;
	var y=-100;
	var empty=true;
	// Objekte!
	var cards=[];
	var img="";
	// Objekte!
    var figur = [];

    // f�r springerwelt
    // toDo: vielleicht gibt ein abstrakteres Modell f�r alle karten
    var visibility = true;
	
	// setters:
    this.setVisibility = function (visible) {
        this.visibility = visibility;
    }

	this.setId=function(id)
	{
		this.id=id;
		// id �bersetzen in x,y-Koordinaten
		this.x=idToK(id)[0];
		this.y=idToK(id)[1];
	}
	this.setCards=function(card)
	{
		cards.push(card);
		// toDo: bild dem feld hinzuf�gen (eigentlich view aufgabe)
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
    this.id = id;
    this.x = x;
    this.y = y;
    this.visibility = visibility;
	this.cards=cards;
	this.img=img;
	//this.figur=figur;
    this.empty = empty;
    //gibt ein Array zur�ck, da mehrere Figuren auf einem Feld stehen k�nnen
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
	
	//falls parameter �bergeben worden sind
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
    // 1=wei�. -1=schwarz (n�tzlich auch f�r die zugrichtung)
	var color = 0;
	var moves = [];
    var cards = [];
    // n�tig f�r Rochade und 50-Z�ge Regel; 0=nicht bewegt, 5=im 5. Halbzug bewegt
    var hasMoved = 0;

    // getters
    this.id = id;
    this.img = img;
    this.name = name;
    this.type = type;
    this.color = color;
    this.feldId = feldId;
    this.moves = moves;
    this.cards = cards;
    this.hasMoved = hasMoved;

    // setters
    this.setFeldId = function (_feldId) {
        this.feldId = _feldId;
    }
    this.setName = function (nam) {
        this.name = nam;
        this.type = nam.substring(0, 1);
        this.color = nam.substring(1, 2)==="w" ? 1 : -1;
        var prefix = "img/svg/";
        var suffix = ".svg";
        this.img = prefix + nam + suffix;
        // figuren id n�tig weil 2 figuren auf einem feld stehen k�nnen?!
        this.id = Math.random().toString(36).substr(2, 9);
    }
    this.setMoves = function (mov) {
        // Array an Z�gen wird �bergeben ["e2-e3","e2-e4"]
        this.moves = mov;
    }

    this.setCards = function (card) {
        cards.push(card);
    }

    // functions
    this.removeCard = function (cardId) {
        removeE(cards, cardId);
    }
    // in welchem Halbzug wurde die Figur bewegt?
    this.raiseMove = function (moveNumber) {
        hasMoved = moveNumber;
    }

    // falls mit parameter aufgerufen wird
    if (_name) {
        this.setName(_name);
    }
}

//leere funktion f�r z�ge damit keine fehler kommen
// f�r setMoves gedacht
function someMoveFunction(feld) {
    console.log(figur.name + " steht auf " + figur.feldId);
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