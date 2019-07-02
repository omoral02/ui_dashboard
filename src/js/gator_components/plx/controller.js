import ScriptsView from './view';
import { stringify } from 'querystring';

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
    this.reset.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
  }

  onParameterInput (e) {
    e.preventDefault();
    let target = e.target; 
    this.validateInput(target);
  }

  validateInput (target) {
    if ( target.classList.contains('input') ) {
      let value = target.value;
      let id = target.id;
      console.log('Input to validate > ' + id, ' : ', `${value}`);
      let result = eval('this.validator.is_'+ id)(value);
      if ( result.valid == true ) {
          console.log(result);
          super.setParameterValue(id, value);
          super.generateUrlBuild();
        } else {
          console.log(result);
          super.inputWasInvalid(target);
        } 
      }
  }
}

