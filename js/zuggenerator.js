// diese Datei soll Standardschach bereit stellen und
// die spätere Integration für ausgespielte Karten sicher stellen

// globale variablen
// Liste der gespielten Züge
var playedMoves = [];
// das Spielbrett mit allen Figuren
var b = [];


// spielrelevante Funktionen
// liefert 0 zurück wenn das feld mit keiner Figur besetzt ist
// 1 falls eine weiße Figur drauf ist und 2 für eine schwarze figur
function isFree(feld) {
    var f = feld.getFigur();
    if (f.length === 0) return 0;
    if (f[0].color == "w") return 1;
    if (f[0].color == "b") return 2;
}
