import AppView from './app_view';
import { ApiKey } from './api_key';
import ScriptsController from '../plx/scripts_controller';
import MapsController from '../dyn_map/maps_controller';

export default class AppController extends AppView {
  constructor() {
    super();
    this.apiKey = ApiKey;
    this.actionButtons = []; 
  }

  onLoadCheckForActionButtons() {
    for (let i = 0; i < this.viewsButtons.length; i++){
      let button = this.viewsButtons[i];
      this.actionButtons.push(button);
    }
    this.loadControllers();
  }

  loadControllers() {
    this.instantiateControllersWith(super.getParametersList(), this.mapsButton, this.plxButton, this.head, this.apiKey, this.viewsPane);
    this.controllerIsNowlistening();
  }

  instantiateControllersWith (placeholders, mapsButton, plxButton, head, apiKey, viewsPane) {
    console.log('Controllers instantiated: ');
    if (!this.scriptsController){
    this.scriptsController = new ScriptsController(plxButton, placeholders, viewsPane);
    console.log(this.scriptsController);
    }
    if (!this.mapsController){
    this.mapsController = new MapsController (mapsButton, placeholders, viewsPane, apiKey, head);
    console.log(this.mapsController);
    }
  }

  controllerIsNowlistening() {
    this.actionButtons.forEach( (button) => {
      button.addEventListener(
        'click', this.oneButtonWasClicked.bind(this),
         false);
    });
    console.log(this);
  }

  oneButtonWasClicked (event) {
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
    super.checkAttachedPanes();
  }

  plxShouldLoad() {
    this.scriptsController.init();
    this.plxButton.removeEventListener(
      'click', this.scriptsController.isNowListening.bind(this),
       false);
  }

  mapShouldLoad() {
    this.mapsController.init();
    this.mapsButton.removeEventListener(
      'click', this.mapsController.isNowListening.bind(this),
      false);
  }

  wsShouldLoad() {
  
  }

  staticMapShouldLoad() {

  }
}

