// Invoquation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

/**
 * Classe Game
 * (Modèle du Jeu du Pendu)
 */
class Game {
  _gameInProgress = false;

  _wordToGuess;

  _usedLetters;

  _displayedWord;

  _nbErrorsAllowed = 0;

  _score = 0;

  /**
   * Lance une nouvelle partie (s'il n'y a pas déjà une partie en cours).
   */
  async launchNewGame() {
    if(this._gameInProgress){
      throw new Error("Il faut d’abord finir la partie en cours !");
    }else{
      this._gameInProgress = true;
      let wordObj = await this.getNewWordObject();
      this._wordToGuess = wordObj.mot;
      this._nbErrorsAllowed = wordObj.nb_essais;
      this._usedLetters = wordObj.mot.charAt(0)+wordObj.mot.charAt(wordObj.mot.length-1);
      this.updateWordToDisplay()
    }
    this.saveState();
    

    // TODO Compléter en Partie 1 ...
  }

  /**
   * Récupère un nouveau mot sous la forme d'un objet.
   * (Une 1ère version de cette méthode vous est fournie, mais vous devrez la modifier par la suite.)
   * @returns {object} Un objet contenant le mot et le nombre d'essais autorisés pour ce mot
   */
  async getNewWordObject() {
    // Retourne (pour l'instant) le mot "ELEPHANT"
    //return { mot: "ELEPHANT", nb_essais: 6 };

    // TODO Modifier en Partie 2 ...
    let wordObj = await fetch('/api/generation.php');

    if(wordObj.ok){
      return wordObj.json();
    }else{
      return { mot: "ELEPHANT", nb_essais: 6 };
    }
  }

  /**
   * Met à jour le mot à afficher.
   * (Fonction fournie. À NE PAS MODIFIER.)
   */
  updateWordToDisplay() {
    this._displayedWord = this.generateWordToDisplay(
      this._usedLetters,
      this._wordToGuess
    );
  }

  /**
   * Retourne une chaine de caractères correspondant au mot dans lequel :
   * - les lettres non présentes dans lettersToDisplay sont remplacées par des "_"
   * - les lettres apparaissant dans lettersToDisplay apparaissent en clair
   * @param {string} lettersToDisplay : Lettres à afficher
   * @param {string} wordToGuess : Mot à trouver
   * @returns {string} Une chaine de la forme "E_E____T"
   */
  generateWordToDisplay(lettersToDisplay, wordToGuess) {

    let output = "";
    for(let i = 0; i < wordToGuess.length; i++){
      if(lettersToDisplay.includes(wordToGuess.charAt(i))){
        output +=wordToGuess.charAt(i);
      }else{
        output += "_";
      }
    }
    return output;
  }

  /**
   * Joue une nouvelle lettre et retourne vrai si la partie est terminée.
   * @param {string} letter : La lettre jouée
   */
  playLetter(letter) {
    if(!this._gameInProgress){
      throw new Error("Pas de partie en cours ! Commencez par lancer une partie.");
    }else if(this._usedLetters.includes(letter)){
      throw new Error(`La lettre ${letter} a déjà été jouée !`);
    }else{
      this._usedLetters += letter;
      if(this._wordToGuess.includes(letter)){
        this.updateWordToDisplay()
        if(this._displayedWord === this._wordToGuess){
          this._gameInProgress = false;
          this._score += this._nbErrorsAllowed;
        }
      }else{
        this._nbErrorsAllowed -= 1;
        if(this._nbErrorsAllowed == 0){
          this._gameInProgress = false;
          this._score -= 2;
        }
      }
    }
    this.saveState();
  }

  /**
   * Sauvegarde l'état du jeu dans le LocalStorage.
   */
  saveState() {
    // TODO Compléter en Partie 3 ...
    localStorage.setItem('gameInProgress', this._gameInProgress);
    localStorage.setItem('wordToGuess', this._wordToGuess);
    localStorage.setItem('score', this._score);
    localStorage.setItem('nbErrorsAllowed', this._nbErrorsAllowed);
    localStorage.setItem('usedLetters', this._usedLetters);
    localStorage.setItem('displayedWord', this._displayedWord);

  }

  /**
   * Récupère l'état du jeu dans le LocalStorage
   * et met à jour le modèle à partir de celui-ci.
   */
  retrieveState() {
    // TODO Compléter en Partie 3 ...

    if(localStorage.getItem("gameInProgress") != null || localStorage.getItem("score") != null){

      if(localStorage.getItem("gameInProgress") == "false"){
        this._score = parseInt(localStorage.getItem("score") ?? 0);
      }else if(localStorage.getItem("gameInProgress") == "true"){
        this._gameInProgress = true;
        this._wordToGuess = localStorage.getItem('wordToGuess');
        this._score = parseInt(localStorage.getItem("score") ?? 0);
        this._nbErrorsAllowed = parseInt(localStorage.getItem('nbErrorsAllowed'));
        this._usedLetters = localStorage.getItem('usedLetters');
        this._displayedWord = localStorage.getItem('displayedWord');
      }else{
        this._score = parseInt(localStorage.getItem("score") ?? 0);
      }
      console.log(this._score);
    }
  }
}
