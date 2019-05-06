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
    this.instantiateControllersWith(super.getFieldSamples(), this.apiKey);
    this.controllerIsNowlistening();
  }

  instantiateControllersWith (placeholders, apiKey) {
    console.log('Controllers instantiated: ');
    if (!this.scriptsController){
    this.scriptsController = new ScriptsController(placeholders, this.viewsPane);
    console.log(this.scriptsController);
    }
    if (!this.mapView){
    this.mapView = new MapsView (placeholders, apiKey);
    console.log(this.mapView);
    }
  }

  controllerIsNowlistening() {
    // console.log('app listeners: ON');
    // console.log('Buttons that have listeners', this.setOfButtons);
    document.addEventListener('insert', ()=> { console.log('Maps script & key inserted!');} );
    this.actionButtons.forEach( (button) => {
      button.addEventListener('click', this.oneButtonWasClicked.bind(this), false);
      // console.log(button.id);
    });
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
