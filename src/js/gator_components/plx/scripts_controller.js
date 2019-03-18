import ScriptsModel from './scripts_model';

export default class ScriptsController extends ScriptsModel {
  constructor() {
    super();
    this.view = null;
  }

  registerInstanceOf(scriptsView) {
    this.view = scriptsView;
    this.registerObserver(this.view);
  }

  registerObserver(observer) {
    if (observer) {
      super.registerObserver(observer);
    }
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
      this.view.checkActive(currentlySelectedScript, scriptIndex);
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
    super.currentlySelectedScriptIndex = scriptIndex;
    this.observers[0].renderParameters(
      super.getParameterNames(scriptIndex));
    this.observers[0].checkShow();
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
    this.observers[0].renderPlxUrl();
  }
}
