// Invoquation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

// Initialisation du modèle
let game = new Game();

// Définition de la fonction à exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Cache tous les messages au départ
  view.hideMessages();

  // TODO Compléter en Partie 3 ...
  if(localStorage.getItem("gameInProgress") != null || localStorage.getItem("score") != null){
    if(view.askIfYesOrNo(`voulez-vous récupérer les informations des parties précédentes ?\n score enregistré : ${parseInt(localStorage.getItem('score') ?? 0)}`)){
      game.retrieveState();
    }
  }

  // MàJ de la vue à partir du modèle
  /* (À faire à chaque fois pour éviter qu'au rafraichissement
    de la page, le navigateur affiche les informations présentes
    dans son "cache" alors que celles-ci ne sont pas cohérentes
    avec le modèle) */
  view.updateFrom(game);
});


view.new_game_btn.addEventListener('click', async()=>{

  view.hideMessages();
  try{
    await game.launchNewGame();
  }catch(error){
    view.displayMessage(error.message);
  }
  view.updateFrom(game);

})


view.letters_btns.forEach((element)=>{
  element.addEventListener('click',()=>{
    view.hideMessages();
    try{
      game.playLetter(element.textContent);
      view.updateFrom(game);
      if(!game._gameInProgress){
        if(game._nbErrorsAllowed == 0){
          view.displayMessage(`Perdu ! Le mot était ${game._wordToGuess}. Votre score a diminué de 2 points.`, MESSAGE_TYPES.lost);
        }else{
          view.displayMessage(`Bravo ! Le mot était bien ${game._wordToGuess}. Votre score a augmenté de ${game._nbErrorsAllowed} point(s).`, MESSAGE_TYPES.win);
        }
      }
    }catch(error){
      view.displayMessage(error.message);
    }
    
  })
})

