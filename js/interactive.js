// dies Datei soll für User-Interaktionen zuständig sein

// globale variabeln
var __isEven = true;
// Ändert die Hintergrundfarbe beim ersten Klick
// setzt sie beim zweiten Klick zurück
function toggleColor(id) {
    var td = g(id);
    var feld = getFeldById(id);
    var figur = feld.getFigur();
    if (figur.length == 0) return;
    var moves = figur[0].moves;

    if (__isEven) {
        for (var i = 0; i < moves.length; i++) {
            var dest = getDestination(moves[i]);
            var feld_dest = getFeldById(dest);
            if ((feld_dest.x + feld_dest.y) % 2 == 0) {
                g(dest).style.backgroundColor = "rgb(" + 173 + "," + 204 + "," + 134 + ")";
            }
            else {
                g(dest).style.backgroundColor = "rgb(" + 158 + "," + 180 + "," + 98 + ")";
            }
        }
        td.style.backgroundColor = "rgb(" + 255 + "," + 255 + "," + 85 + ")";
    }
    else {
        for (var i = 0; i < b.length; i++) {
            var x = b[i].x;
            var y = b[i].y;
            if ((x + y) % 2 == 0) {
                g(b[i].id).style.backgroundColor = "rgb(" + 203 + ", " + 139 + ", " + 71 + ")";
            }
            else {
                g(b[i].id).style.backgroundColor = "rgb(" + 255 + ", " + 206 + ", " + 158 + ")";
            }
        }
    }
    __isEven = !__isEven;
}