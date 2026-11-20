"use strict"; // enable strict mode 

/*
insert a new row using number, name, surname and points as parametres
 */
function doInsertRowTable(num, nom, prenom, points) { // function declaration slide 45
    const table = document.querySelector("table");

    // innerHtml mentioned in slide 34
    //insert row using innerHTml
    table.innerHTML += '<tr class="row">'
        + '<td class="col_number">' + num + '</td>'
        + '<td class="col_text">' + nom + '</td>'
        + '<td class="col_text">' + prenom + '</td>'
        + '<td class="col_number">' + points + '</td>'
        + '<td class="col_chkbox"><input type="checkbox"/></td>'
        + '</tr>';
}

// addEventListener slide 139
// adds a user by clicking on ajouter  with the (99, nom,prenom, 10)
const btnAjouter = document.querySelector("button");
btnAjouter.addEventListener("click", function () { // click with events  (slide 126 )
    doInsertRowTable(99, "nom", "prenom", 10);
});