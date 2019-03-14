import ScriptsModel from './scripts_model';

export default class ScriptsController extends ScriptsModel {
  constructor() {
    super();
    this.view;
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
    const scriptIndex = this.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    this.setParameterValue(scriptIndex, parameterName, parameterValue);
    this.observers[0].resetLink();
    console.log(this.link.valueOf());
    this.observers[0].renderPlxUrl(this.generatePlxUrl());

    
  }

  scriptManager(scriptIndex) {
    console.log(this.observers);
    this.currentlySelectedScriptIndex = scriptIndex;
    this.observers[0].renderParameters(
      super.getParameterNames(scriptIndex));
    this.observers[0].checkShow();
  }

  generatePlxUrl() {
    let script = super.getCurrentSelectedScript();
    this.link.url_add_on = this.link.basePlxUrl + `${script.id}?p=`;
    this.link.URL = this.link.url_add_on;
    let params = Object.entries(script.parameters);
    params.forEach(([key, value], index) => {
      this.link.params += `${key}:${value}`;
      if (index !== params.length - 1) {
        this.link.params += ',';
      }
    });
    this.link.URL += this.link.params;
    console.log(this.link.valueOf());
    return this.link.URL;
  }
}
