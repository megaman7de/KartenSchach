// setzt eine Figur auf das Brett
// erwartet das feld als objekt als parameter
function drawField(field)
{
    var feld_ = g(field.id);
    // was ist auf dem feld?
    var s = field.getFigur().length;
    if (s == 1) {
        feld_.style.backgroundImage = "url(" + field.getFigur()[0].img + ")";
        feld_.style.backgroundSize = "cover";
    }
    if (s == 0) {
        feld_.style.backgroundImage = "";
    }
    if (s > 1) {
        // toDO
    }
}

function setBoard(board) {
    var res = [];
    var aufstellung = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    var trs = board.getElementsByTagName("tr");
    var table_size = trs.length;

    // zeilen durchgehen
    for (var i = 0; i < table_size; i++) {
        var tds = trs[i].getElementsByTagName("td");
        // spalten durch gehen
        for (var j = 0; j < table_size; j++) {
            var td = tds[j];
            var id = td.getAttribute("id");
            // feld erzeugen
            var f = new feld(id);
            var fi;

            // figuren erzeugen und setzen
            //bauern
            if ((f.y == 2 || f.y==7) && f.x > 0 && f.x < 9) {
                fi = f.y==2 ? new figur("Pw") : new figur("Pb");
            }
            // alle anderen figuren
            if ((f.y == 1 || f.y == 8) && f.x > 0 && f.x < 9) {
                fi = f.y == 1 ? new figur(aufstellung[f.x - 1] + "w") : new figur(aufstellung[f.x - 1] + "b");
            }

            if (fi !== undefined) {
                f.setFigur(fi);
                fi = undefined;
            }

            drawField(f);
            res.push(f);
        }
    }
    return res;
}