import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor(plxButton, placeholders, viewPane) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
  }

  init() {
    super.initializeView();
  }

  isNowListening() {
    this.plxButton.addEventListener(
      'click', super.initializeView.bind(this),
      false)
    this.ListInnerContainer.addEventListener(
      'click', this.onScriptClick.bind(this),
       false);
    this.parametersInnerContainer.addEventListener(
      'input', this.onParameterInput.bind(this),
       false);
    console.log(this);
    
  }

  onScriptClick (event) {
    let currentlySelectedScript = this.currentlySelectedScript =
      event.target;
    let scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript.classList.contains('listed-item')) {
      this.myState = super.getNewState(scriptIndex, currentlySelectedScript);
      super.visualManager();
    }
  }

  onParameterInput (event) {
    super.setFullUrlTo('');
    const scriptIndex = super.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    super.setParameterValue(scriptIndex, parameterName, parameterValue);
    super.generatePlxUrl()
  }
}

