import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor( util, placeholders, viewPane, plxButton ) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
    this.validator = util; //input validation class
  }

  init() {
    super.setInitialStateObject();
    super.initializeView();
    this.isNowListeningForParametersToggle();
  }

  isNowListeningForParametersToggle() {
    super.setMyStateToInitialWorkingState();
    this.scriptsListContainer.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
    this.close.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
    this.reset.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
  }

  onScriptTitleClick (e) {
    e.preventDefault();
    let currentlySelectedItem = e.target;
    if ( currentlySelectedItem.classList.contains('listed-item') ) {
        super.insertParametersContainer();
        let scriptIndex = parseInt(currentlySelectedItem.dataset.index);
        super.getNewWorkingState(scriptIndex, currentlySelectedItem);
        if ( this.secondaryParent.classList.contains('show') ){
              super.visualManager('remove');
              super.removeActive(super.getStateCurrentlySelectedScript());
        } else {
              super.visualManager('insert');
              this.innerComponentIsNowListening();
        }
    } else if ( currentlySelectedItem.id == 'resetLink' ){
              super.secondaryParentContainsShowRemove('link');
    } else if ( currentlySelectedItem.id == 'reset' ){
              super.secondaryParentContainsShowRemove('children');
    } else if ( currentlySelectedItem.id == 'close' ){
              super.secondaryParentContainsShowRemove('all');
    }
  }

  innerComponentIsNowListening() {
    this.parametersInnerContainer.addEventListener(
      'input', this.onParameterInput.bind(this),
       false);
  }

  onParameterInput (e) {
    e.preventDefault();
    let target = e.target; 
    this.validateInput(target);
  }

  validateInput (target) {
    let inputField = target;
    if ( inputField.classList.contains('input') ) {
        // use eval to dynamically invoke regEx functions that filter input
        // based on target id as the ids are part of the function names.
        // from `validate_input.js`. 
        // ex: `this.validator.is_project_number(value)` < validate project number
        // ex: `this.validator.is_case_number(value)` < validate case number
        let id = inputField.id;
        console.log('Input to filter :: ' + id);
        let filteredResult = eval('this.validator.is_'+ id)(inputField);
        console.log('Does input match filter? :: ', filteredResult.isFiltered);
        this.validateOutputOn(filteredResult);
      }
  }

  validateOutputOn (result) {
    let validationCheck = result;
    let input = validationCheck.input;
    let script = super.getCurrentlySelectedScript();
    // this regEx tests the input.value to ensure 
    // there is no white-space in the filtered result. 
    let regEx = /[^\S+]/gi;
    console.log(validationCheck);
    if ( input.value && regEx.test(input.value) == false ) {
        console.log('Do we have whitespace? ', regEx.test(input.value));
              // add the property `validationcheck.valid` 
              // to be either true or false 
              if ( validationCheck.isFiltered === true ){
                Object.defineProperty(validationCheck, 'valid', {value:true, writable: true});
                this.classToggleOn(validationCheck)
                super.setParameterValue(input.id, input.value);
                super.generateUrlBuild(script);
                super.renderPlxUrl();
              } else {
                Object.defineProperty(validationCheck, 'valid', {value:false, writable: true});
                this.classToggleOn(validationCheck);
             }
      }
  }

  classToggleOn (finalResult) {
    let final = finalResult;
    let field = final.input;
    let status = final.valid;  
    if ( final && status == true ) {
      console.log('This', `${field.id}`, 'meets the minimum requirements');
      this.isValid(field, status);
    } else {
      console.log('This does not meet the minimum requirements for a', `${field.id}`);
    // this.isInvalid(field, status);
    } 
    // super.renderInputValidity(field, status)
  }

  isValid (input, status) {
    let field = input;
    console.log('Is ', field.id, 'valid? ', status, ':: ', field.value);
  }

  //   isInvalid (input, status) {
  //   const field = input;
  // }
}

