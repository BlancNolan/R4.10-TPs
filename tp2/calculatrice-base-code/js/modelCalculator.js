/**
 * Classe Calculator.
 * (Modèle représentant la calculatrice)
 */
class Calculator {
  /**
   * Expression actuelle de la calculatrice.
   * @type {string}
   */
  _input;

  /**
   * Mémoire de la calculatrice.
   * @type {{string|null}}
   */
  _memory;

  /**
   * Objet littéral contenant les boutons éditables de la calculatrice.
   * (Clé = ID du bouton, Valeur = Objet EditableButton associé)
   * @type {Object}
   */
  _editableButtons;

  /**
   * Constructeur de la classe Calculator.
   * @param {Object} editableBtns : Informations sur les boutons éditables.
   */
  constructor(editableBtns) {
    this._input = "";
    this._memory = null;

    // Initialisation des boutons éditables
    // (avec un ID qui commence par "libre" suivi d'un chiffre)
    this._editableButtons = {};
    for (let key in editableBtns) {
      let btn = new EditableButton(key, editableBtns[key]);
      this._editableButtons[key] = btn;
    }
  }

  /**
   * Retourne l'expression actuelle de la calculatrice.
   * @returns {string}
   */
  getInput() {
    return this._input;
  }

  /**
   * Met à jour l'expression actuelle de la calculatrice.
   * @param {string} expr : Nouvelle expression
   */
  setInput(expr) {
    this._input = expr;
  }

  /**
   * Vide l'entrée de la calculatrice.
   */
  clearInput() {
    this._input = "";
  }

  addIntput(value){
    this._input += value;
  }

  inversSign(){
    if(this._input.charAt(0) == "-"){
      this._input = this._input.slice(1);
    }else{
      this._input = "-"+this._input;
    }
  }

  eval(){
    try{
      this._input = eval(this._input).toString()
    }catch(e){
      this._input = "error";
      alert("Erreur de saisie")
    }
  }

  setMemory(){
    this._memory = this._input;
  }

  clearMemory(){
    this._memory = null;
  }

  recallMemory(){
    if(this._memory !== null){
      this._input += this._memory;
    }
  }
}
