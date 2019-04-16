import AppModel from './app_model';
import ScriptsView from '../plx/scripts_view';
import MapsView from '../dyn_map/maps_view';

export default class AppController extends AppModel {
  constructor() {
    super();
    this.self = this;
  }

  samples() {
    return super.getFieldSamples();
  }

  loadViewsWith(plxButton, popWindow, apiKey, map) {
    this.instantiateViewsWith(this.samples(), plxButton, popWindow, apiKey, map);
  }

  instantiateViewsWith(placeholders, plxButton, window, key, map) {
    this.scriptsView = new ScriptsView(placeholders, plxButton, window);
    this.mapView = new MapsView (placeholders, key, map);
  }

  togglePlxContainer  () {
    this.scriptsView.init();
    this.scriptsView.toggleScriptsContainer();
  }

  toggleMapContainer () {
    this.mapView.init();
    this.mapView.toggleMapContainer();
  }
}
