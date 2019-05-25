import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor(plxButton, placeholders, viewPane) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
  }

  init() {
    super.setInitialStateObject();
    super.initializeView();
    this.isNowListeningForParametersToggle();
  }

  isNowListeningForParametersToggle() {
    super.setMyStateToInitialWorkingState();
    this.scriptsListContainer.addEventListener(
      'click', this.onScriptClick.bind(this),
       false);
    this.close.addEventListener(
      'click', this.onScriptClick.bind(this),
      false);
  }

  onScriptClick (e) {
    e.preventDefault();
    let currentlySelectedItem = e.target;
    if (currentlySelectedItem.classList.contains('listed-item')) {
        super.insertParametersContainer();
        let scriptIndex = parseInt(currentlySelectedItem.dataset.index);
        this.myState = super.getNewWorkingState(scriptIndex, currentlySelectedItem);
        if (this.secondaryParent.classList.contains('show')){
              super.visualManager('remove');
              super.removeActive(this.myState.currentlySelectedScript);
        } else {
              super.visualManager('insert');
              this.innerComponentIsNowListening();
        }
    } else if (currentlySelectedItem.id == 'reset' ){
        super.secondaryParentContainsShowRemove('children');
    } else if (currentlySelectedItem.id == 'resetLink'){
        super.secondaryParentContainsShowRemove('link');
    } else if (currentlySelectedItem.id == 'close'){
        super.secondaryParentContainsShowRemove('all');
    }
  }

  innerComponentIsNowListening() {
    this.parametersInnerContainer.addEventListener(
      'input', this.onParameterInput.bind(this),
       false);
    this.reset.addEventListener(
      'click', this.onScriptClick.bind(this),
       false);
  }

  onParameterInput (e) {
    e.preventDefault();
    super.setParameterValue(e.target.id, e.target.value);
    super.generateUrlBuild()
  }
}

