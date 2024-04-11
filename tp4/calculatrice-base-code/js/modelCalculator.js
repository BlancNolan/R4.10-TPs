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
    let regex = /^(-)?\d+(.\d+)?$/;
    
    if(this._input.trim() === ""){
      throw "Impossible d’enregistrer la valeur en mémoire : Champ vide"
    }else if(!regex.test(this._input)){
      throw "Impossible d’enregistrer la valeur en mémoire : Champ ne contenant pas un nombre valide";
    }else{
      this._memory = this._input;
      this.saveStateToClient();
    }

  }

  clearMemory(){
    this._memory = null;
  }

  recallMemory(){
    if(this._memory !== null){
      this._input += this._memory;
    }
  }

  saveStateToClient(){

    localStorage.setItem("memoryContent", this._memory ?? "");
    let obj = {};

    for(const btn in this._editableButtons){
      obj[btn] = this._editableButtons[btn].getValue();
    };

    let chaineJSON = JSON.stringify(obj);
    localStorage.setItem("editableButtonsContent", chaineJSON);
  }

  retrieveStateFromClient(){

    if((localStorage.getItem("memoryContent")) != ""){
      this._memory = localStorage.getItem("memoryContent");
    }

    if(localStorage.getItem("editableButtonsContent")){
      let obj = JSON.parse(localStorage.getItem("editableButtonsContent"));
      for (let key in obj) {
        let btn = new EditableButton(key, obj[key]);
        this._editableButtons[key] = btn;
      }
    }
  }

  saveStateToServer(){

    let state = {
      "editableButtons": {},
      "memory" : this._memory,
    }
    for( let key in this._editableButtons){
      state.editableButtons[key] = this._editableButtons[key].getValue();
    }

    state = JSON.stringify(state);

    //appel api
    fetch("api/save-calculator-state.php",{
      method: "POST",
      body: "state=" + state,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then((response)=>{
      if(!response.ok){
        console.log("erreur : "+response.status)
      }
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  async retrieveStateFromServer(){
    let objResponse = await fetch("api/get-calculator-state.php");
  
    if(objResponse.ok){
      let state = await objResponse.json();
      this._memory = state.memory;
      this._editableButtons ={};
      for (let key in state.editableButtons) {
        let btn = new EditableButton(key, state.editableButtons[key]);
        this._editableButtons[key] = btn;
      }
    }else{
      console.error(objResponse);
    }

  }

}
