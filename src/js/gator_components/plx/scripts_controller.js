import ScriptsView from './scripts_view';
import { defaultCipherList } from 'constants';

export default class ScriptsController extends ScriptsView {
  constructor(placeholders, viewPane) {
    super(placeholders, viewPane);
  }

  init() {
    super.initializeView();
    super.setInitialStateObject();
    this.controllerIsNowListening();
    console.log(this);
  }

  controllerIsNowListening() {
    this.ListInnerContainer.addEventListener(
      'click', this.onScriptClick.bind(this), false);
    this.parametersInnerContainer.addEventListener(
      'input', this.onParameterInput.bind(this), false);
  }

  onScriptClick(event) {
    let currentlySelectedScript = this.currentlySelectedScript =
      event.target;
    let scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript.classList.contains('listed-item')) {
      this.myState = super.getNewState(scriptIndex, currentlySelectedScript);
      this.scriptManager();
    }
  }

  scriptManager() {
    super.checkActiveOn(this.myState.currentlySelectedScript);
    super.renderParameters(super.getParameterNames(this.myState.currentlySelectedScriptIndex));
    super.checkShow();
  }

  onParameterInput(event) {
    super.setFullUrlTo('');
    const scriptIndex = super.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    super.setParameterValue(scriptIndex, parameterName, parameterValue);
    this.generatePlxUrl()
  }

  generatePlxUrl() {
    let script = super.getCurrentlySelectedScript();
    let addThis = `${script.id}?p=`;
    super.setScriptIdTo(addThis);
    console.log(addThis);
    let params = {};
    params = Object.entries(script.parameters);
    let paramBuild = '';
    params.forEach(([key, value], index) => {
      paramBuild += `${key}:${value}`;
      if (index !== params.length - 1) {
        paramBuild += ',';
      }
    });
    super.setScriptParametersTo(paramBuild);
    this.URL = super.getBasePlxUrl();
    this.URL += super.getScriptId();
    this.URL += super.getScriptParameters();
    super.renderPlxUrl();
  }
}
