/**
 * Objet constant représentant la vue.
 */
const view = {
  // Champ de la calculatrice
  calcInput: document.getElementById("zone_affichage"),

  // Bouton CE
  ceBtn: document.querySelector("input[value='CE']"),

  // Boutton backspace
  backspaceBtn: document.getElementById("backspace"),

  //recuup des btn simple
  simplesBtns : document.querySelectorAll(".bouton_simple"),

  //invers sign btn
  inversSignBtn : document.getElementById("plusMinus"),

  // egal btn
  egBtn: document.querySelector("input[value='=']"),

  //btn de memoire
  msBtn : document.querySelector("input[value='MS']"),
  mcBtn : document.querySelector("input[value='MC']"),
  mrBtn : document.querySelector("input[value='MR']"),

  // check box editable
  editableBtns: document.getElementById("editionCheckbox"),

  // bouttons libres
  libresBtns: document.querySelectorAll(".bouton_libre"),
};