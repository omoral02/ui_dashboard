import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor( util, placeholders, plxButton, viewPane ) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
    this.validator = util; //input validation class
  }

  init() {
    // super.setInitialStateObject();
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
              this.visualManager('remove');
              super.removeActive(super.getStateCurrentlySelectedScript());
        } else {
              this.visualManager('insert');
              this.innerComponentIsNowListening();
        }
    } else if ( currentlySelectedItem.id == 'resetLink' ){
              this.secondaryParentContainsShowRemove('link');
    } else if ( currentlySelectedItem.id == 'reset' ){
              this.secondaryParentContainsShowRemove('children');
    } else if ( currentlySelectedItem.id == 'close' ){
              this.secondaryParentContainsShowRemove('all');
    }
  }

  visualManager (value) {
    if ( value === 'remove' ) {
      this.secondaryParentContainsShowRemove('children');
    } else if ( value == 'insert' ) {
        super.insertParametersContainer();
        super.renderParams(super.getParameterNames(super.getStateCurrentlySelectedScriptIndex()));
        super.matchParamsTo(this.placeholders);
    }
    super.checkActiveOn(super.getStateCurrentlySelectedScript());
  }

  secondaryParentContainsShowRemove (level) {
    super.resetContainerFor(level);
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
        // ex: `this.validator.is_project_number(value, validatorFunction)` < validate project number
        // ex: `this.validator.is_case_number(value, validatorFunction)` < validate case number
        let id = inputField.id;
        console.log('Input to filter :: ' + id);
        let filteredResult = eval('this.validator.is_'+ id)(inputField, this.validator.test_);
        console.log('Does input match filter? :: ', filteredResult.isTested);
        this.validateOutputOn(filteredResult);
      }
  }

  validateOutputOn (result) {
    let validationCheck = result;
    let input = validationCheck.input;
    let script = super.getCurrentlySelectedScript();
    // this regEx tests the input.value to ensure
    // there is no white-space in the tested result.
    let regEx = /[^\S+]/gi;
    console.log(validationCheck);
    if ( input.value && regEx.test(input.value) == false ) {
        console.log('Do we have whitespace? ', regEx.test(input.value));
              // add the property `validationcheck.valid`
              // to be either true or false
              if ( validationCheck.isTested === true ){
                Object.defineProperty(validationCheck, 'valid', {value:true, writable: true});
                this.classToggleOn(validationCheck);
                super.setParameterValue(input.id, input.value);
                this.generateUrlBuild(script);
                super.renderPlxUrl();
              } else {
                Object.defineProperty(validationCheck, 'valid', {value:false, writable: true});
                this.classToggleOn(validationCheck);
             }
      }
  }

  generateUrlBuild(script) {
    const scriptId = `${script.id}?p=`;
    super.setScriptIdTo(scriptId);
    this.paramBuild();
  }

  paramBuild () {
    let paramBuild = '';
    const parameterEntries = Object.entries(super.getScriptParameterValues());
    parameterEntries.forEach(( [key, value], index ) => {
          paramBuild += `${key}` + ':' +`${value}`;
            if ( index !== parameterEntries.length - 1 ) {
              paramBuild += ',';
            }
    });
    console.log('String representation of parameter inputs:: ', paramBuild);
    super.setScriptParamsTo(paramBuild);
    let URL  = super.getBasePlxUrl();
    URL += super.getScriptId();
    URL += super.getParameterInputs();
    super.setFullUrlTo(URL);
  }

  classToggleOn (finalResult) {
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
    console.log('Is ', field.id, 'valid? ', status, ':: ', field.value);
  }

  //   isInvalid (input, status) {
  //   const field = input;
  // }
}

