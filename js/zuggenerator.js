// diese Datei soll Standardschach bereit stellen und
// die sp�tere Integration f�r ausgespielte Karten sicher stellen

// globale variablen
// Liste der gespielten Z�ge
var playedMoves = [];
// das Spielbrett mit allen Figuren
var b = [];


// spielrelevante Funktionen
// liefert 0 zur�ck wenn das feld mit keiner Figur besetzt ist
// 1 falls eine wei�e Figur drauf ist und 2 f�r eine schwarze figur
function isFree(feld) {
    var f = feld.getFigur();
    if (f.length === 0) return 0;
    if (f[0].color == "w") return 1;
    if (f[0].color == "b") return 2;
}
