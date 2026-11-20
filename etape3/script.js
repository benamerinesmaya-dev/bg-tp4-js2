"use strict"; // enable strict mode (slide 141 chapitre 4)

// the var lignes is at 0
let lignes = 0; // variable declaration slide 50

// creating the table using table object (slide 40)
let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];


init();

// init calls doinsert for each object in table persones
function init() { // function declaration slide 45
    for (let i = 0; i < persons.length; i++) { // iterate over array with index (slide 44 chapitre 4)
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

// doInsert calls doInsertRowTable
function doInsert(nom, prenom, points) {
    // increment by one for the next line instead of 99
    lignes++;
    const num = lignes; // variable declaration slide 50

    doInsertRowTable(num, nom, prenom, points);
}

// Insère a ligne
function doInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("table"); // select element via CSS selector slide 76

    // build the full row HTML as a string and append it to the table slide 105
    table.innerHTML += '<tr class="row">'
        + '<td class="col_number">' + num + '</td>'
        + '<td class="col_text">' + nom + '</td>'
        + '<td class="col_text">' + prenom + '</td>'
        + '<td class="col_number">' + points + '</td>'
        + '<td class="col_chkbox"><input type="checkbox"/></td>'
        + '</tr>'; // insert HTML row innerHTML slide 34
}

//show the content of the table in the console
function consoleTableau() {
    console.log(persons);
}

// addEventListener slide 139
document.getElementById("btn_add").addEventListener("click", function () { // attach click event listener (slide 126 chapitre 4)
    doInsertRowTable(99, "nom", "prenom", 10);
});

// addEventListener slide 139
document.getElementById("btn_console").addEventListener("click", consoleTableau); // attach click event listener (slide 126 chapitre 4)