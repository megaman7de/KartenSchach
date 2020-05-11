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
        // toDO: was wenn 2 oder mehr Karten auf ein Feld gespielt worden sind?
    }
}

// sortiert das Brett in ein lineares Array
// bei 8x8: 0=a1, 7=h1, 63=h8
// bei 10x10: 0=`0, 9=i0, 10=`1, 99=i9
function sortBoard(board) {
    var size = board.length;
    var l = Math.pow(size, 0.5);
    var d2 = ((l - 8) / 2)-1;
    var b2 = new Array(size);
    for (var i = 0; i < size; i++) {
        /*  kleiner hack für irgendwann a<-->b:
            a = b + (b=a, 0) oder
            [a, b] = [b, a]; */
        // formel für direktes richtiges platzieren:
        // (x+d2)+(y+d2)*l
        var x = board[i].x;
        var y = board[i].y;
        b2[(x + d2) + ((y + d2) * l)] = board[i];
    }
    for (var i = 0; i < size; i++) {
        board[i] = b2[i];
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

    //Feld sortieren um Zugriff und Berechnungen zu erleichtern
    sortBoard(res);
    return res;
}