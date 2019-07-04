import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor( placeholders, viewPane, plxButton, validate ) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
    this.validator = validate; //input validation class
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
  }

  onScriptTitleClick (e) {
    e.preventDefault();
    const currentlySelectedItem = e.target;
    if ( currentlySelectedItem.classList.contains('listed-item') ) {
        super.insertParametersContainer();
        const scriptIndex = parseInt(currentlySelectedItem.dataset.index);
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
    this.reset.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
  }

  onParameterInput (e) {
    e.preventDefault();
    const target = e.target; 
    this.validateInput(target);
  }

  validateInput (target) {
    const inputField = target;
    if ( inputField.classList.contains('input') ) {
        // use eval to dynamically invoke regEx functions that filter input
        // based on target id as the ids are part of the function names.
        // from `validate_input.js`. 
        // ex: `this.validator.is_project_number(value)` < validate project number
        // ex: `this.validator.is_case_number(value)` < validate case number
        let id = inputField.id;
        console.log('Input to filter :: ' + id);
        const filteredResult = eval('this.validator.is_'+ id)(inputField);
        console.log('Is input filtered? :: ', filteredResult.isFiltered);
        this.validate(filteredResult);
      }
  }

  validate (result) {
    const validationCheck = result;
    const input = validationCheck.input;
    const script = super.getCurrentlySelectedScript();
    const regEx = /[^\S+]/gi
    console.log(validationCheck);
    if ( input.value && regEx.test(input.value) == false ) {
        console.log('Do we have whitespace? ', regEx.test(input.value));
              validationCheck.valid = true;
              this.classToggleOn(validationCheck)
              super.setParameterValue(input.id, input.value);
              super.generateUrlBuild(script);
              super.renderPlxUrl();
            } else {
              validationCheck.valid = false;
              this.classToggleOn(validationCheck);
            }
    
  }

  classToggleOn (finalResult) {
    const final = finalResult;
    const field = final.input;
    const status = final.valid;  
    if ( final && status == true ) {
      console.log('This', `${field.id}`, 'meets the minimum requirements');
      this.isValid(field, status);
    } else {
      console.log('This does not meet the minimum requirements for a', `${field.id}`);
      // this.isNotValid(field, status);
    } 
    // super.renderInputValidity(field, status)
  }

  isValid (input, status) {
    const field = input;
    console.log('Is ', field.id, 'valid? ', status, ':: ', field.value);
  }

  // isNotValid (input, status) {
  //   const field = input;
  // }
}

