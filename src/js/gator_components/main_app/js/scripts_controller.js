export default class ScriptsController {
  constructor(scripts_model) {
    this.scripts_model = scripts_model;
    this.placeholders_model = this.scripts_model.placeholders_model;
  }

  registerObserver(observer) {
    this.scripts_model.registerObserver(observer);
  }

  onScriptClick(e) {
    const currentlySelectedScript = this.scripts_model.currentlySelectedScript =
        e.target;
    const scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript) {
      this.checkActive(currentlySelectedScript, scriptIndex);
      this.scripts_model.notifyAll();
      // this.scripts_model.notifyAll(); // is equal to
      // this.scripts_model.observers[0].update() //
    }
  }

  scriptManager(scriptIndex) {
    this.scripts_model.currentlySelectedScriptIndex = scriptIndex;
    this.scripts_model.observers[0].renderParameters(
        this.scripts_model.getParameterNames(scriptIndex));
    this.scripts_model.observers[0].checkShow();
  }

  onParameterInput(event) {
    const scriptIndex = this.scriptsModel.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    this.scripts_model.setParameterValue(
        scriptIndex, parameterName, parameterValue);
    this.scripts_model.observers[0].renderPlxUrl(
        this.scripts_controller.generatePlxUrl());
  }

  generatePlxUrl() {
    const script = this.scripts_model.getCurrentSelectedScript();
    const params = Object.entries(script.parameters);
    this.scripts_model.url_add_on =
        this.scripts_model.basePlxUrl + `${script.id}?p=`;
    this.scripts_model.URL = this.scripts_model.url_add_on;
    this.scripts_model.params = '';
    params.forEach(([key, value], index) => {
      this.scripts_model.params += `${key}:${value}`;
      if (index !== params.length - 1) {
        this.scripts_model.params += ',';
      }
    });
    this.scripts_model.URL += this.scripts_model.params;
  }
}
