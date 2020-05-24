// diese Datei soll Standardschach bereit stellen und
// die spätere Integration für ausgespielte Karten sicher stellen

// globale variablen
// Liste der gespielten Züge
var playedMoves = ["Pd7-d5"];
// das Spielbrett mit allen Figuren
var b = [];


// spielrelevante Funktionen
// liefert 0 zurück wenn das feld mit keiner Figur besetzt ist
// 1 falls eine weiße Figur drauf ist und -1 für eine schwarze figur
// NaN falls das feld nicht existiert
function isFree(feld) {
    var f;
    try {
        f = feld.getFigur();
    }
    catch (e) {
        return NaN;
    }
    if (f.length === 0) return 0;
    return f[0].color;
}

// gibt das Feld-Objekt der id zurück
function getFeldById(id) {
    for (var i = 0; i < b.length; i++) {
        if (b[i].id == id) return b[i];
    }
    // falls nicht gefunden worden ist wird -1 zurück gegeben
    return -1;
}

// gibt true zurück wenn wenn das Feld im spielbaren Bereich liegt
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
        var m = [];
        switch (type) {
            case "N": {
                m=movesKnight(feld);
            } break;
            case "R": {
                m = movesRook(feld);
            } break;
            case "B": {
                m = movesBishop(feld);
            } break;
            case "Q": {
                m = movesQueen(feld);
            } break;
            case "K": {
                m = movesKing(feld);
            } break;
            case "P": {
                m = movesPawn(feld);
            } break;
            default: {
                console.log("Error: Type not found");
            }
        }
        figur[0].setMoves(m);
    }
    else {
        //toDo: 2 Figuren
    }
}

// Turm/Läufer/Dame vereinheitlichen
// erwartet das Feld und die Zugmöglichkeiten (p)
function movesBRQ(feld, p) {
    var res = [];
    var figur = feld.getFigur()[0];
    var x = feld.x;
    var y = feld.y;
    for (var i = 0; i < p.length; i++) {
        // durch gehen bis man auf rand oder figur stößt
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

// gibt die Zugmöglichkeit des Königs wieder
// Im Kartenschach darf der König im Schach stehen
function movesKing(feld) {
    var res = [];
    var figur = feld.getFigur()[0];
    // possibility
    var p = [
        [0, 1],
        [0, -1],
        [1, 1],
        [1, 0],
        [1, -1],
        [-1, 1],
        [-1, 0],
        [-1, -1]
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
    // Rochade prüfen
    // toDo: Darf im Kartenschach der König im Schach/durch Schach rochieren?
    // König nicht bewegt
    if (figur.hasMoved == 0) {
        console.log("t1");
        // kleine Rochade o-o
        // felder frei
        if (isFree(getFeldById(kToId(x + 1, y))) === 0 && isFree(getFeldById(kToId(x + 2, y))) === 0) {
            // Turm nicht bewegt
            if (getFeldById(kToId(x + 3, y)).getFigur()[0].hasMoved == 0) {
                // übergibt auch den y wert
                console.log("t3");
                res.push("o-o"+y);
            }

        }
        // große Rochade o-o-o
        // felder frei
        if (isFree(getFeldById(kToId(x - 1, y))) === 0 && isFree(getFeldById(kToId(x - 2, y))) === 0 && isFree(getFeldById(kToId(x - -3, y))) === 0) {
            // Turm nicht bewegt
            if (getFeldById(kToId(x - 4, y)).getFigur()[0].hasMoved == 0) {
                res.push("o-o-o"+y);
            }
        }
    }
    return res;
}

// gibt die Zugmöglichkeit eines Bauerns wieder
function movesPawn(feld) {
    var res = [];
    var figur = feld.getFigur()[0];

    var x = feld.x;
    var y = feld.y;
    var z = figur.color;

    // eins gerade aus laufen
    if (isFree(getFeldById(kToId(x, y + z))) === 0)
    {
        res.push(figur.type + feld.id + "-" + kToId(x, y + z));
    }
    // 2 felder am anfang laufen
    if ((y == 2 && z == 1) || (y == 7 && z == -1)) {
        if (isFree(getFeldById(kToId(x, y + z))) === 0 && isFree(getFeldById(kToId(x, y + 2 * z))) === 0) {
            res.push(figur.type + feld.id + "-" + kToId(x, y + 2*z));
        }
    }
    // schräg schlagen links
    if (isFree(getFeldById(kToId(x-1, y + z))) === z*-1) {
        res.push(figur.type + feld.id + "x" + kToId(x - 1, y + z));
    }
    // schräg schlagen rechts
    if (isFree(getFeldById(kToId(x + 1, y + z))) === z * -1) {
        res.push(figur.type + feld.id + "x" + kToId(x + 1, y + z));
    }
    // en-passent
    // letzter Zug war Bauernzug
    var l = playedMoves[playedMoves.length - 1];
    if (l.substring(0, 1) == "P") {
        // Bauer wurde 2 felder bewegt
        var von = idToK(l.substring(1, 3));
        var nach = idToK(l.substring(4, 6));
        if (Math.abs(von[1] - nach[1]) == 2) {
            // dieser Bauer ist neben dem Bauer
            if (Math.abs(x - nach[0]) == 1 && y==nach[1]) {
                res.push(figur.type + feld.id + "x" + kToId(nach[0], y+z));
            }
        }
    }

    return res;
}

// gibt die Zugmöglichkeit eines Turms wieder
function movesRook(feld) {
    var p = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];
    return movesBRQ(feld, p);
}

// gibt die Zugmöglichkeit eines Läufers wieder
function movesBishop(feld) {
    var p = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];
    return movesBRQ(feld, p);
}
// gibt die Zugmöglichkeit einer Dame wieder
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