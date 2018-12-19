class ScriptsController {
  constructor(scriptsModel) {
    this.scriptsModel = scriptsModel;
    this.placeholdersModel = this.scriptsModel.placeholdersModel;
  }
  
  registerObserver (observer) {
    this.scriptsModel.registerObserver(observer);
  }

  onScriptClick(e) {
    const currentlySelectedScript = this.scriptsModel.currentlySelectedScript =
        e.target;
    const scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript) {
      this.checkActive(currentlySelectedScript, scriptIndex);
      this.scriptsModel.notifyAll();
      // this.scriptsModel.notifyAll(); // this is equal to this.scriptsModel.observers[0].update() // 
    }
  }

  scriptManager(scriptIndex) {
    this.scriptsModel.currentlySelectedScriptIndex = scriptIndex;
    this.scriptsModel.observers[0].renderParameters(this.scriptsModel.getParameterNames(scriptIndex));
    this.scriptsModel.observers[0].checkShow();
  }


  onParameterInput(event) {
    const scriptIndex = this.scriptsModel.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    this.scriptsModel.setParameterValue(
        scriptIndex, parameterName, parameterValue);
    this.scriptsModel.observers[0].renderPlxUrl(this.scriptsController.generatePlxUrl());
  }

  generatePlxUrl() {
    const script = this.scriptsModel.getCurrentSelectedScript();
    const params = Object.entries(script.parameters);
    this.scriptsModel.url_add_on = this.scriptsModel.basePlxUrl + `${script.id}?p=`;
    this.scriptsModel.URL = this.scriptsModel.url_add_on;
    this.scriptsModel.params = '';
    params.forEach(([key, value], index) => {
      this.scriptsModel.params += `${key}:${value}`;
      if (index !== params.length - 1) {
        this.scriptsModel.params += ',';
      }
    });
    this.scriptsModel.URL += this.scriptsModel.params;
  }
}
