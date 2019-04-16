import AppModel from './app_model';
import ScriptsView from '../plx/scripts_view';
import MapsView from '../dyn_map/maps_view';
import { ApiKey } from './api_key';

export default class AppController extends AppModel {
  constructor() {
    super();
    this.self = this;
    this.apiKey = ApiKey;
 
  }

  samples() {
    return super.getFieldSamples();
  }

  loadViewsWith(plxButton, popWindow, map) {
    console.log(this.apiKey);
    this.instantiateViewsWith(this.samples(), plxButton, popWindow, this.apiKey, map);
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
