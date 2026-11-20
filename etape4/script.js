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


function init() {
    for (let i = 0; i < persons.length; i++) { // iterate over array with index slide 44
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
        persons.push({nom: nom, prenom: prenom, points: points}); // add element to array slide 38
    }}