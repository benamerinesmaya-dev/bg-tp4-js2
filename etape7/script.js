"use strict"; // mode strict (slide 141 chapitre 4)

// the var lignesis Initialized at 0
let lignes = 0;

// The var total_points is Initialized at 0
let total_points = 0;

// creating the table using table object slide 40
let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// call init()
init();

// Parcourt persons et insère chaque objet
function init() {
    for (let i = 0; i < persons.length; i++) { // iterate over array with index slide 44
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

//update the variables
function doInsert(nom, prenom, points) {
    // Add points using the variable toatl_points after inserting a new user
    total_points += points;

    //increment by one
    lignes++;
    const num = lignes;

    doInsertRowTable(num, nom, prenom, points);

    // call update_summary to update the new variable
    update_summary();
}

// insert a new row in the table persones
function doInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("table"); // select element via CSS selector slide 76

    // insert HTML row via innerHTML (slide 105 chapitre 4)
    table.innerHTML += '<tr class="row">'
        + '<td class="col_number">' + num + '</td>'
        + '<td class="col_text">' + nom + '</td>'
        + '<td class="col_text">' + prenom + '</td>'
        + '<td class="col_number">' + points + '</td>'
        + '<td class="col_chkbox"><input type="checkbox"/></td>'
        + '</tr>';
}

// update the resume part
function update_summary() {
    const element_lignes = document.getElementById("p1"); // select element by id slide 61
    const element_points = document.getElementById("p3");

    element_lignes.innerText = lignes + " ligne(s)"; // update element text content slide 90
    element_points.innerText = "Total point(s)= " + total_points; // update element text content slide 90
}

//read the "formulaire" and insert the new user using getElemtntById slide 61
function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value); // convert string to integer parseInt

    // no empty fields allowed
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        window.alert("Formulaire incomplet !"); // alert slide 116 BOm
    } else {
        // inset and update dans html
        doInsert(nom, prenom, points);

        // insert in the table "persons"
        persons.push({ nom: nom, prenom: prenom, points: points }); // add element to array slide 38

        // Vider les champs pour préparer une autre saisie
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

// delete the checked rows
function deleteRow() {
    //check if the table is empty
    if (lignes === 0) {
        window.alert("Le tableau est vide !"); // alert slide 116 BOm
        return;
    }

    // get the table with the checked boxes
    const table = document.querySelector("table"); // select element via CSS selector slide 76
    const checked = table.querySelectorAll(".col_chkbox input:checked"); // select element via CSS selector slide 76

    // check the length using if condition slide 42
    if (checked.length === 0) {
        window.alert("Sélectionnez au moins une ligne !"); // alert slide 116 BOM
        return;
    }

    // ask for confirmation
    if (!window.confirm("Voulez-vous supprimer les lignes sélectionnées ?")) {
        return;
    }

    // retrive all the lines using querySelectorAll slide76
    const rows = table.querySelectorAll("tr"); // select element via CSS selector slide 76

    // Step A: collect the indices of rows to delete (0-based persons index = DOM row index - 1)
    let toDelete = [];
    for (let i = rows.length - 1; i >= 1; i--) { // iterate over array with index slide 44
        const chk = rows[i].querySelector(".col_chkbox input"); // select element via CSS selector slide 76
        if (chk.checked) {
            total_points -= parseInt(rows[i].children[3].innerText); // convert string to integer parseInt
            lignes--;
            rows[i].parentNode.removeChild(rows[i]);
            toDelete.push(i - 1); // add element to array slide 38
        }
    }

    //rebuild persons without the deleted rows
    let newPersons = [];
    for (let j = 0; j < persons.length; j++) { // iterate over array with index slide 44
        let shouldDelete = false;
        for (let k = 0; k < toDelete.length; k++) {
            if (toDelete[k] === j) {
                shouldDelete = true;
            }
        }
        if (!shouldDelete) {
            newPersons.push(persons[j]); // add element to array slide 38
        }
    }
    persons = newPersons;

    // uncheck master checkbox after deletion
    document.getElementById("chk_all").checked = false;

    //success message
    window.alert("Suppression réussie !"); // alert slide 116 BOm
    update_summary();
}

// show the content in the console
function consoleTableau() {
    console.log(persons);
}


// Feature 1 is select all checkboxes
function toutCocher() {
    const masterChk = document.getElementById("chk_all"); // select element by id slide 61
    const checkboxes = document.querySelectorAll(".col_chkbox input"); // select element via CSS selector slide 76

    for (let i = 0; i < checkboxes.length; i++) { // iterate over array with index slide 44
        checkboxes[i].checked = masterChk.checked;
    }
}

// Feature 2 is a search function
function filtrerTableau() {
    const searchText = document.getElementById("search_input").value.toLowerCase(); // select element by id slide 61
    const rows = document.querySelectorAll("table tr.row"); // select element via CSS selector slide 76

    for (let i = 0; i < rows.length; i++) { // iterate over array with index slide 44
        const nom = rows[i].children[1].innerText.toLowerCase();
        const prenom = rows[i].children[2].innerText.toLowerCase();

        // show or hide row based on match (style property slide 94)
        if (nom.indexOf(searchText) !== -1 || prenom.indexOf(searchText) !== -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Feature 3 is modify info
function modifierLigne() {
    const table = document.querySelector("table"); // select element via CSS selector slide 76
    const checked = table.querySelectorAll(".col_chkbox input:checked"); // select element via CSS selector slide 76

    // check the length using if condition slide 42
    if (checked.length === 0) {
        window.alert("Sélectionnez une ligne à modifier !"); // alert slide 116 BOM
        return;
    }
    if (checked.length > 1) {
        window.alert("Sélectionnez une seule ligne à la fois !"); // alert slide 116 BOM
        return;
    }

    // read new values from the form
    const elt_nom = document.getElementById("form_nom"); // select element by id slide 61
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    const newNom = elt_nom.value;
    const newPrenom = elt_prenom.value;
    const newPoints = parseInt(elt_points.value); // convert string to integer parseInt

    // no empty fields allowed
    if (newNom === "" || newPrenom === "" || Number.isNaN(newPoints)) {
        window.alert("Formulaire incomplet pour la modification !"); // alert slide 116 BOM
        return;
    }

    // find the checked row and its index in persons
    const rows = table.querySelectorAll("tr.row"); // select element via CSS selector slide 76
    for (let i = 0; i < rows.length; i++) { // iterate over array with index slide 44
        const chk = rows[i].querySelector(".col_chkbox input"); // select element via CSS selector slide 76
        if (chk.checked) {
            // update total_points by subtracting old points and adding new points
            const oldPoints = parseInt(rows[i].children[3].innerText);
            total_points = total_points - oldPoints + newPoints;

            // update HTML table
            rows[i].children[1].innerText = newNom; // update element text content slide 90
            rows[i].children[2].innerText = newPrenom;
            rows[i].children[3].innerText = newPoints;

            // update persons array object
            persons[i].nom = newNom;
            persons[i].prenom = newPrenom;
            persons[i].points = newPoints;

            // remove the checks the row and clear
            chk.checked = false;
            elt_nom.value = "";
            elt_prenom.value = "";
            elt_points.value = "";
            break;
        }
    }

    window.alert("Modification réussie !"); // alert slide 116 BOM
    update_summary();
}

// getElemnetBYId slide 61
document.getElementById("btn_add").addEventListener("click", doNewData);
document.getElementById("btn_console").addEventListener("click", consoleTableau);
document.getElementById("btn_delete").addEventListener("click", deleteRow);
document.getElementById("chk_all").addEventListener("change", toutCocher);
document.getElementById("search_input").addEventListener("keyup", filtrerTableau);
document.getElementById("btn_edit").addEventListener("click", modifierLigne);