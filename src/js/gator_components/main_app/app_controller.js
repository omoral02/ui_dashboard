import AppView from './app_view';
import { ApiKey } from './api_key';
import ScriptsController from '../plx/scripts_controller';
import MapsView from '../dyn_map/maps_view';

export default class AppController extends AppView {
  constructor() {
    super();
    this.apiKey = ApiKey;
    this.actionButtons = []; 
  }

  onLoad() {
    this.loadControllers(this.setOfButtons);
  }

  loadControllers(buttons) {
    let _buttons = buttons;
    for (let i =0; i < _buttons.length; i++){
      let button = _buttons[i];
      this.actionButtons.push(button);
    }
    this.instantiateControllersWith(super.getParametersList(), this.apiKey);
    this.controllerIsNowlistening();
  }

  instantiateControllersWith (placeholders, apiKey) {
    console.log('Controllers instantiated: ');
    if (!this.scriptsController){
    this.scriptsController = new ScriptsController(placeholders, this.viewsPane);
    console.log(this.scriptsController);
    }
    if (!this.mapView){
    this.mapView = new MapsView (placeholders, apiKey, this.head);
    console.log(this.mapView);
    }
  }

  controllerIsNowlistening() {
    this.head.addEventListener('load', function(event){
        // if (event.target.nodeName === 'SCRIPT') {
            console.log(event.target.getAttribute('rel'));
        // }
     }, false);
    this.actionButtons.forEach( (button) => {
      button.addEventListener('click', this.oneButtonWasClicked.bind(this), false);
    });
  }

  scriptLoaded (event) {
    if (event.target.rel == 'Maps Script') {
        console.log('Script loaded: ', event.target);
      }
  }

  oneButtonWasClicked(event) {
    if (event.target.id == 'plx_button'){
        console.log('This plx button was tapped');
        this.plxShouldLoad();
    } else if (event.target.id == 'map_button'){
        console.log('This map button was tapped');
        this.mapShouldLoad();
    } else if (event.target.id == 'ws_button') {
        console.log('This ws button was tapped');
        this.wsShouldLoad();
    } else if (event.target.id == 'static_map_button') {
        console.log('This static map button was tapped');
        this.staticMapShouldLoad();
    }
    this.checkPanes();
  }

  plxShouldLoad () {
    this.scriptsController.init();
  }

  mapShouldLoad () {
    this.mapView.init();
    // this.mapView.toggleMapContainer();
  }

  wsShouldLoad () {
  
  }

  staticMapShouldLoad () {

  }

  checkPanes () {
    super.checkAttachedPane();
  }
}
