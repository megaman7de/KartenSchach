// dies Datei soll für User-Interaktionen zuständig sein

// Ändert die Hintergrundfarbe beim ersten Klick
// setzt sie beim zweiten Klick zurück
function toggleColor(id) {
    var td = g(id);
    var feld = getFeldById(id);
    var figur = feld.getFigur();
    var fieldColor = td.style.backgroundColor;
    if (figur.length == 0) {
        // wenn ein Zielfeld ausgewählt worden ist (ein Zug gemacht wurde)
        if (fieldColor == whiteFieldColorMarked || fieldColor == blackFieldColorMarked) {
            moveFigure();
            return;
        }
        else {
            // kein gültiger zug gewählt
        }
        
    }
    var moves = figur.length==0 ? 0 : figur[0].moves;

    if (!__isEven) {
        for (var i = 0; i < moves.length; i++) {
            var dest = getDestination(moves[i]);
            var feld_dest = getFeldById(dest);
            if ((feld_dest.x + feld_dest.y) % 2 == 0) {
                // grün markiertes schwarzes Feld
                g(dest).style.backgroundColor = blackFieldColorMarked;
            }
            else {
                // grün markiertes weißes Feld
                g(dest).style.backgroundColor = whiteFieldColorMarked;
            }
           
        }
        // toDo: Felder richtig markieren
        td.style.backgroundColor = selectedFieldColor;
    }
    else {
        // wenn ein Zielfeld ausgewählt worden ist (ein Zug gemacht wurde)
        if (fieldColor == whiteFieldColorMarked || fieldColor == blackFieldColorMarked) {
            moveFigure();
        }
        // Feldfarben zurücksetzen
        for (var i = 0; i < b.length; i++) {
            var x = b[i].x;
            var y = b[i].y;
            if ((x + y) % 2 == 0) {
                // "schwarzes" Feld
                g(b[i].id).style.backgroundColor = blackFieldColor;
            }
            else {
                // "weißes Feld"
                g(b[i].id).style.backgroundColor = whiteFieldColor;
            }
        }
    }
    __isEven = !__isEven;
}

// bewegt eine Figur auf dem Brett
// erwartet einen gültigen Zug als Parameter
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
    console.log(playedMoves);
    // hasMoved updaten
    sourceFigur[0].hasMoved = playedMoves.length - 2;
    // wenn eine Figur geschlagen wurde muss diese entfernt werden
    if (destFigur.length > 0) {
        destField.removeFigur(destFigur[0])
    }
    // neue Figur hinzufügen
    destField.setFigur(sourceFigur[0]);
    // alte Figur entfernen
    sourceField.removeFigur(sourceFigur[0]);
    // felder neu zeichnen
    drawField(getFeldById(source));
    drawField(getFeldById(dest));


    // felder togglen
    toggleColor(source);
    console.log(__selectedFigure + "  move wurde ausgelöst " + source + "--" + dest);
}