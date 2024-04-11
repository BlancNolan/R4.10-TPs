// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

// ### Initialisation du modèle ###
// (à partir du contenu des boutons éditables)
const editableBtnsInfos = {
};
let calculator = new Calculator(editableBtnsInfos);
calculator.retrieveStateFromClient();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Initialisation de l'affichage des boutons éditables ###
for (let key of Object.keys(calculator._editableButtons)) {
  // La clé de l'objet correspond à un ID de bouton dans la page
  let btnElt = document.getElementById(key);
  // Si le bouton existe bien, on met à jour sa valeur affichée
  if (btnElt) {
    btnElt.value = calculator._editableButtons[key].getValue();
  }
}

// ### Initialisation des listeners ###
// - Gestion de la saisie au clavier
view.calcInput.addEventListener("keyup", (evt) => {
  // Informe le modèle du changement
  calculator.setInput(evt.target.value);
  // (La vue n'a pas besoin d'être mis à jour ici)
});

// - Gestion du bouton CE
// (qui vide la champ de la calculatrice)
view.ceBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  calculator.clearInput();
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

// - Gestionn du boutton backspace
// qui retire un caractere du champ de la cal
view.backspaceBtn.addEventListener("click", ()=>{
  //supprime un caractere
  calculator.setInput(calculator.getInput().slice(0, -1));
  //affiche le resultat
  view.calcInput.value = calculator.getInput();
})


//gestion des btn simple

document.addEventListener("click", (e)=>{
  if(e.target.classList.contains("bouton_simple"))
    classicClickListener(e);
})

let classicClickListener = function (event) {
    calculator.addIntput(event.target.value);
    view.calcInput.value = calculator.getInput();
};

//gestion inverseur de signe
view.inversSignBtn.addEventListener("click", ()=>{

  calculator.inversSign();
  //affiche le resultat
  view.calcInput.value = calculator.getInput();
})

// Gestion du btn egal
view.egBtn.addEventListener("click", ()=>{
  calculator.eval();
  //affiche le resultat
  view.calcInput.value = calculator.getInput();
})


// gestion des bouttons memoire
view.msBtn.addEventListener("click", ()=>{

  
  try{
    calculator.setMemory();
    calculator.saveStateToClient()
  }catch(e){
    alert(e);
  }
  
})
view.mrBtn.addEventListener("click", ()=>{
  calculator.recallMemory();
  //affiche le resultat
  view.calcInput.value = calculator.getInput();
})
view.mcBtn.addEventListener("click", ()=>{
  calculator.clearMemory();
  calculator.saveStateToClient();
})



view.libresBtns.forEach(element => {
  element.addEventListener("click", ()=>{
    if(!view.editableBtns.checked){
      element.type = "button";
      calculator.addIntput(element.value)
      view.calcInput.value = calculator.getInput();
    }else{
      element.type = "text";
      element.addEventListener("input", ()=>{
        calculator._editableButtons[element.id] = new EditableButton(element.id, element.value);
        //calculator.saveStateToClient();
      })

      element.addEventListener("blur", ()=>{
        element.type = "button";
        element.value = calculator._editableButtons[element.id].getValue();
      })
      
    }
  })
});