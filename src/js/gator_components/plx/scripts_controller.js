import ScriptsView from './scripts_view';

export default class ScriptsController extends ScriptsView {
  constructor(placeholders, viewPane) {
    super(placeholders, viewPane);
  }

  init() {
    super.initializeView();
    this.controllerIsNowListening();
    console.log(this);
  }

  controllerIsNowListening () {
    this.ListInnerContainer.addEventListener(
      'click', this.onScriptClick.bind(this), false);
    this.parametersInnerContainer.addEventListener(
      'onChange', this.onParameterInput.bind(this), false);
  }

  getParentHtml() {
    return super.getScriptsParentHTML();
  }

  scripts() {
    let list = super.getScripts();
    return list;
  }

  onScriptClick(event) {
    let currentlySelectedScript = this.currentlySelectedScript =
      event.target;
    let scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript) {
      super.checkActive(currentlySelectedScript);
      this.scriptManager(scriptIndex)
    }
  }

  onParameterInput(event) {
    const scriptIndex = super.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    super.setParameterValue(scriptIndex, parameterName, parameterValue);
    console.log(this.link.valueOf());
    this.generatePlxUrl()    
  }

  scriptManager(scriptIndex) {
    this.currentlySelectedScriptIndex = scriptIndex;
    super.renderParameters(
    super.getParameterNames(scriptIndex));
    super.checkShow();
  }

  generatePlxUrl() {
    let script = super.getCurrentSelectedScript();
    let addThis = this.link.basePlxUrl + `${script.id}?p=`;
    super.setAddOnTo(addThis);
    let params = Object.entries(script.parameters);
    params.forEach(([key, value], index) => {
      this.link.params += `${key}:${value}`;
      if (index !== params.length - 1) {
        this.link.params += ',';
      }
    });
    let URL = super.getAddOn();
    URL += this.link.params;
    this.link.params = '';
    super.setFullUrlTo(URL);
    super.renderPlxUrl();
  }
}
