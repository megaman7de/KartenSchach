// diese Datei soll Standardschach bereit stellen und
// die sp�tere Integration f�r ausgespielte Karten sicher stellen

// globale variablen
// Liste der gespielten Z�ge
var playedMoves = [];
// das Spielbrett mit allen Figuren
var b = [];


// spielrelevante Funktionen
// liefert 0 zur�ck wenn das feld mit keiner Figur besetzt ist
// 1 falls eine wei�e Figur drauf ist und -1 f�r eine schwarze figur
// NaN falls das feld nicht existiert
function isFree(feld) {
    var f;
    try {
        f = feld.getFigur();
        console.log("isfree: " + f);
    }
    catch (e) {
        console.log(e);
        return NaN;
    }
    if (f.length === 0) return 0;
    return f[0].color;
}

// gibt das Feld-Objekt der id zur�ck
function getFeldById(id) {
    for (var i = 0; i < b.length; i++) {
        if (b[i].id == id) return b[i];
    }
    // falls nicht gefunden worden ist wird -1 zur�ck gegeben
    return -1;
}
// gibt true zur�ck wenn wenn das Feld im spielbaren Bereich liegt
function isInField(feld) {
    try {
        var x = feld.x;
        var y = feld.y;
        if (x >= 1 && x <= 8 && y >= 1 && y <= 8) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log("Error: " + e);
        return false;
    }
}

// verteilt den aufruf an die richtige funktion
function delegate(feldId) {
    var feld = getFeldById(feldId);
    var figur = feld.getFigur();

    if (figur.length == 1) {
        
        var type = figur[0].type;
        switch (type) {
            case "N": {
                var m=movesKnight(feld);
                console.log(m);
            } break;
            case "R": {
                var m = movesRook(feld);
                console.log(m);
            } break;
            case "B": {
                var m = movesBishop(feld);
                console.log(m);
            } break;
            case "Q": {
                var m = movesQueen(feld);
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

// Turm/L�ufer/Dame vereinheitlichen
// erwartet das Feld und die Zugm�glichkeiten (p)
function movesBRQ(feld, p) {
    var res = [];
    var figur = feld.getFigur()[0];
    var x = feld.x;
    var y = feld.y;
    for (var i = 0; i < p.length; i++) {
        // durch gehen bis man auf rand oder figur st��t
        var newX = x + p[i][0];
        var newY = y + p[i][1];
        do {
            var id = kToId(newX, newY);
            var newFeld = getFeldById(id);
            var pattern = isFree(newFeld);
            var isInF = isInField(newFeld);
            // frei, andere figur und im feld
            if ((pattern === 0 || pattern === figur.color * -1) && isInF) {
                if (pattern == 0) {
                    res.push(figur.type + feld.id + "-" + newFeld.id);
                    newX += p[i][0];
                    newY += p[i][1];
                }
                else {
                    res.push(figur.type + feld.id + "x" + newFeld.id);
                    break;
                }
            }
            if (!isInF || pattern === figur.color) break;
        }
        while (isInF && pattern !== NaN)
    }
    return res;
}

// gibt die Zugm�glichkeit eines Pferdes wieder
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
            if (pattern === 0) {
                res.push(figur.type + feld.id + "-" + id);
            }
            else {
                res.push(figur.type + feld.id + "x" + id);
            }
        }
    }

    return res;
}

// gibt die Zugm�glichkeit eines Turms wieder
function movesRook(feld) {
    var p = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];
    return movesBRQ(feld, p);
}

// gibt die Zugm�glichkeit eines L�ufers wieder
function movesBishop(feld) {
    var p = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];
    return movesBRQ(feld, p);
}
// gibt die Zugm�glichkeit einer Dame wieder
function movesQueen(feld) {
    var p = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];
    return movesBRQ(feld, p);
}