// dies Datei soll f�r User-Interaktionen zust�ndig sein

// setzt die Feldfarben auf standard zur�ck ( hebt markierungen auf)
function resetBoardColor() {
    // Feldfarben zur�cksetzen
    for (var i = 0; i < b.length; i++) {
        var x = b[i].x;
        var y = b[i].y;
        if ((x + y) % 2 == 0) {
            // "schwarzes" Feld
            g(b[i].id).style.backgroundColor = blackFieldColor;
        }
        else {
            // "wei�es Feld"
            g(b[i].id).style.backgroundColor = whiteFieldColor;
        }
    }

    // hebt auch die aktuelle selectierung auf
    __selectedFigure = "";
}

// markiert die spielbaren Z�ge; erwartet die z�ge als Array
function setBoardColor(moves) {

        for (var i = 0; i < moves.length; i++) {
            var dest = getDestination(moves[i]);
            var feld_dest = getFeldById(dest);
            if ((feld_dest.x + feld_dest.y) % 2 == 0) {
                // gr�n markiertes schwarzes Feld
                g(dest).style.backgroundColor = blackFieldColorMarked;
            }
            else {
                // gr�n markiertes wei�es Feld
                g(dest).style.backgroundColor = whiteFieldColorMarked;
            }
        }
}

// bewegt eine Figur auf dem Brett
// erwartet einen g�ltigen Zug als Parameter
function moveFigure() {
    //toDo enpassent/ rochade/ bauer am ende: anders behandeln
    var source = __selectedFigure.substring(1, 3);
    var dest = getDestination(__selectedFigure);
    var sourceField = getFeldById(source);
    var destField = getFeldById(dest);
    var destFigur = destField.getFigur();
    var sourceFigur = sourceField.getFigur();
    // playedMoves updaten
    playedMoves.push(getElementByString(sourceFigur[0].moves, dest));
    console.log(" z�ge: " + sourceFigur[0].moves);
    console.log(playedMoves);
    // hasMoved updaten
    sourceFigur[0].hasMoved = playedMoves.length - 2;
    // wenn eine Figur geschlagen wurde muss diese entfernt werden
    if (destFigur.length > 0) {
        destField.removeFigur(destFigur[0])
    }
    // neue Figur hinzuf�gen
    destField.setFigur(sourceFigur[0]);
    // alte Figur entfernen
    sourceField.removeFigur(sourceFigur[0]);
    // felder neu zeichnen
    drawField(getFeldById(source));
    drawField(getFeldById(dest));

    console.log(__selectedFigure + "  move wurde ausgel�st " + source + "--" + dest);
}