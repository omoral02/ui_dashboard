import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor( util, placeholders, plxButton, viewPane ) {
    super(placeholders, viewPane);
    this.currentlySelectedItem;
    this.plxButton = plxButton;
    this.validator = util; //input validation class
    this.paramBuild;
  }

  init() {
    super.setInitialStateObject();
    super.initializeView();
    this.scriptTitleParametersToggle();
  }

  scriptTitleParametersToggle() {
    super.setMyStateToInitialWorkingState();
    this.scriptsListContainer.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
    this.close.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
    // this.reset.addEventListener(
    //   'click', this.onScriptTitleClick.bind(this),
    //    false);
  }

  onScriptTitleClick (e) {
    this.currentlySelectedItem;
    // if ( e === Event ) {
    //   e.preventDefault();
    //   this.currentlySelectedItem = e.target;
    // } else if ( e === Element ) {
    //   this.currentlySelectedItem = e;
    // }
    this.currentlySelectedItem = e.target;
    if ( this.currentlySelectedItem.classList.contains('listed-item') ) {
        super.insertParametersContainer();
        let scriptIndex = parseInt(this.currentlySelectedItem.dataset.index);
        super.getNewWorkingState(scriptIndex, this.currentlySelectedItem);
        this.removeTitleListener();
        this.checkShowOn(this.secondaryParent);
    }else if ( this.currentlySelectedItem.id == 'close' ){
              this.visualManager('all');
              super.setMyStateToInitialWorkingState();
    }
    // else if ( currentlySelectedItem.id == 'reset' ){
    //   this.removeTitleListener();
    //   super.setMyStateToInitialWorkingState();
    //   this.visualManager('remove');
    // }
  }

  removeTitleListener(){
    this.scriptsListContainer.removeEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false); 
  }

  removePlxClickListener(){
    this.generate.removeEventListener(
      'click', this.onPlxClick.bind(this),
      false);
  }

  checkShowOn (secondaryParent) {
    if ( secondaryParent.classList.contains('show') ){
      this.removeTitleListener();
      this.removePlxClickListener();
      this.visualManager('remove');
      super.removeActive(super.getStateCurrentlySelectedScript());
      super.setMyStateToInitialWorkingState();
      super.insertScriptsContainer();
      this.init();
      // // this.onScriptTitleClick(super.getCurrentlySelectedScript);
    } else {
          // this.removeTitleListener();
          this.visualManager('insert');
          // this.generateScriptId();
          this.innerComponentIsNowListening();
    }
  }

  visualManager (value) {
    if ( value === 'remove' ) {
      this.secondaryParentContainsShowRemove('children');
      super.checkActiveOn(super.getStateCurrentlySelectedScript());
    } else if ( value === 'all' ) {
      this.secondaryParentContainsShowRemove('all');
    } else if ( value == 'insert' ) {
        super.insertParametersContainer();
        super.renderParams(super.getParameterNames(super.getStateCurrentlySelectedScriptIndex()));
        super.matchParamsTo(this.placeholders);
        super.checkActiveOn(super.getStateCurrentlySelectedScript());
    }
  }

  secondaryParentContainsShowRemove (level) {
    super.resetContainerFor(level);
  }

  innerComponentIsNowListening() {
    let childnodes = document.getElementsByTagName('input');
    console.log(childnodes);
    // listen for field inputs
    // if values are typed in
    if(childnodes){
      for(let n=0; n < childnodes.length; n++){
        let inputNode = childnodes[n];
        if (inputNode){
          inputNode.addEventListener(
          'input', this.onParameterInput.bind(this), 
          false)
        }
      }
    }
    // listen for click trigger
    // if values programmatically inserted
    this.generate.addEventListener(
      'click', this.onPlxClick.bind(this),
      false);
  }

  onParameterInput (e) {
    e.preventDefault();
    let node = e.target;
    this.inputDetectedOn(node);
  }

  onPlxClick (e) {
    e.preventDefault();
    this.removePlxClickListener();
    let childnodes = document.getElementsByTagName('input');
    console.log(childnodes);
    if(childnodes){
      for(let n=0; n < childnodes.length; n++){
        let node = childnodes[n];
        if (node.value){
          this.inputDetectedOn(node); 
          console.log(node);
        }
      }
      this.buildClick();
    }
    // this.innerComponentIsNowListening();
  }

  inputDetectedOn(target){
    let inputField = target
    if ( inputField.classList.contains('input') && inputField.value ) {
      this.validateInputOn(inputField);
    }
  }

  validateInputOn (target) {
    let inputField = target;
        // use eval to dynamically invoke regEx functions that filter input
        // based on target id as the ids are part of the function names.
        // from `validate_input.js`.
        // ex: `this.validator.is_project_number(value, validatorFunction)` < validate project number
        // ex: `this.validator.is_case_number(value, validatorFunction)` < validate case number
        let id = inputField.id;
        console.log('Input to filter :: ' + id);
        let filteredResult = eval('this.validator.is_'+ id)(inputField);
        console.log('Does input match filter? :: ', filteredResult.isTested);
        this.validateOutputOn(filteredResult);
  }

  validateOutputOn (result) {
    let validationCheck = result;
    let input = validationCheck.input;
    // this regEx tests the input.value to ensure
    // there is no white-space in the tested result.
    let regEx = /[^\S+]/gi;
    console.log(validationCheck);
  
    // super.createLinkElement();
    if ( input.value && regEx.test(input.value) === false ) {
        console.log('Whitespace in input? :: ', regEx.test(input.value));
              // add the property `validationcheck.valid`
              // to be either true or false
              if ( validationCheck.isTested === true ){
                Object.defineProperty(validationCheck, 'valid', {value:true, writable: true});
                this.final(validationCheck);
                super.setParameterValue(input.id, input.value);
              } else {
                Object.defineProperty(validationCheck, 'valid', {value:false, writable: true});
                this.final(validationCheck);
             }    
      }
  }

 buildClick () {
   this.generateScriptId();
   this.paramBuild = '';
   super.setScriptParamsTo(this.paramBuild);
    const parameterEntries = Object.entries(super.getScriptParameterValues());
    console.log(parameterEntries);
    if(parameterEntries.length >= 1){
        parameterEntries.forEach(( [key, value], index ) => {
              this.paramBuild += `${key}` + ':' +`${value}`;
                if ( index !== parameterEntries.length - 1 ) {
                  this.paramBuild += ',';
                }
        });
        console.log('String representation of parameter inputs :: ', this.paramBuild, '\n');
        this.setScriptLinkTo(this.paramBuild);    
    }
    super.clickPlxUrl();
  }

  generateScriptId() {
    let script = super.getCurrentlySelectedScript();
    const scriptId = `${script.id}?p=`;
    super.setScriptIdTo(scriptId);
  }

  setScriptLinkTo(link){
    super.setScriptParamsTo(link);
    let URL  = super.getBasePlxUrl();
    URL += super.getScriptId();
    URL += super.getParameterInputs();
    super.setFullUrlTo(URL);
  }

  final (finalResult) {
    let final = finalResult;
    let field = final.input;
    let status = final.valid;
    if ( final && status == true ) {
      console.log('This', `${field.id}`, 'meets the minimum requirements'); 
      this.isValid(field, status);
    } else if ( final && status == false ) {
      console.log('This does not meet the minimum requirements for a', `${field.id}`);
    // this.isInvalid(field, status);
    }
    // super.renderInputValidity(field, status)
  }

  isValid (input, status) {
    let field = input;
    console.log('Is ', field.id, 'valid? ', status, ' ===', field.value);
  }

  //   isInvalid (input, status) {
  //   const field = input;
  // }
}

