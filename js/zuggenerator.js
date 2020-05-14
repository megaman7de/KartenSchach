// diese Datei soll Standardschach bereit stellen und
// die spätere Integration für ausgespielte Karten sicher stellen

// globale variablen
// Liste der gespielten Züge
var playedMoves = [];
// das Spielbrett mit allen Figuren
var b = [];


// spielrelevante Funktionen
// liefert 0 zurück wenn das feld mit keiner Figur besetzt ist
// 1 falls eine weiße Figur drauf ist und -1 für eine schwarze figur
// NaN falls das feld nicht existiert
function isFree(feld) {
    var f;
    try {
        f = feld.getFigur();;
    }
    catch (e) {
        return NaN;
    }
    if (f.length === 0) return 0;
    if (f[0].color == "w") return 1;
    if (f[0].color == "b") return -1;
}

// gibt das Feld-Objekt der id zurück
function getFeldById(id) {
    for (var i = 0; i < b.length; i++) {
        if (b[i].id == id) return b[i];
    }
    // falls nicht gefunden worden ist wird -1 zurück gegeben
    return -1;
}

// verteilt den aufruf an die richtige funktion
function delegate(feldId) {
    var feld = getFeldById(feldId);
    var figur = feld.getFigur();
    var color = figur.color;

    if (figur.length == 1) {
        
        var type = figur[0].type;
        switch (type) {
            case "N": {
                var m=movesKnight(feld);
                console.log(m);
            } break;
            default: {
                console.log("Error: Type not found");
            }
        }
    }
    else {
        //toDo: 2 Figuren
    }
}

// gibt die Zugmöglichkeit eines Pferdes wieder
function movesKnight(feld) {
    var res = [];
    var figur = feld.getFigur()[0];
    // possibility
    var p = [
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1]
    ];
    var x = feld.x;
    var y = feld.y;
    for (var i = 0; i < p.length; i++) {
        var newX = x + p[i][0];
        var newY = y + p[i][1];
        var id = kToId(newX, newY);
        var newFeld = getFeldById(id);
        var pattern = isFree(newFeld);
        // frei oder andere farbe und sichtbar
        if ((pattern === 0 || pattern === figur.color * -1) && newFeld.visibility) {
            if (pattern == 0) {
                res.push(figur.type + feld.id + "-" + id);
            }
            else {
                res.push(figur.type + feld.id + "x" + id);
            }
        }
    }

    return res;
}
