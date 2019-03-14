import ScriptsView from './scripts_view';
import AppModel from './app_model';

export default class AppController extends AppModel {
  constructor() {
    super();
    this.self = this;
  }

  loadViewsWith(plxButton, popWindow) {
    this.instantiateViewsWith(this.samples(), plxButton, popWindow);
  }

  samples() {
    return super.getFieldSamples();
  }

  instantiateViewsWith(placeholders, plxButton, window) {
    this.scriptsView = new ScriptsView(placeholders, plxButton, window);
    this.scriptsView.init();
  }

  togglePlxContainer  () {
    this.scriptsView.toggleScriptsContainer();
  }
}
