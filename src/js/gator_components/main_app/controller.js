import { ApiKey } from './api_key';
import AppView from './view';
import ScriptsController from '../plx/controller';
import MapsController from '../dynamic_map_modules/map/controller';

export default class AppController extends AppView {
  constructor(Util) {
    super();
    this.util = new Util;
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
    this.instantiateControllersWith(
          this.util, 
          super.getParametersList(), 
          this.mapsButton, 
          this.plxButton, 
          this.head, 
          this.apiKey, 
          this.viewsPane);
    this.controllerIsNowlistening();
  }

  instantiateControllersWith (util, placeholders, mapsButton, plxButton, head, apiKey, viewsPane) {
    if (!this.scriptsController){
    this.scriptsController = new ScriptsController(plxButton, placeholders, viewsPane);
    }
    if (!this.mapsController){
    this.mapsController = new MapsController (util, mapsButton, placeholders, viewsPane, apiKey, head);
    }
  }

  controllerIsNowlistening() {
    this.actionButtons.forEach( (button) => {
      button.addEventListener(
        'click', this.oneButtonWasClicked.bind(this),
        true);
    });
    console.log(this);
  }

  oneButtonWasClicked (e) {
    e.preventDefault();
    if (e.target.id == 'plx_button'){
        this.plxShouldLoad();
    } else if (e.target.id == 'map_button'){
        this.mapShouldLoad();
    } else if (e.target.id == 'ws_button') {
        this.wsShouldLoad();
    } else if (e.target.id == 'static_map_button') {
        this.staticMapShouldLoad();
    }
    super.checkAttachedPanes();
  }

  plxShouldLoad() {
    this.scriptsController.init();
  }

  mapShouldLoad() {
    this.mapsController.init();
  }

  wsShouldLoad() {
  
  }

  staticMapShouldLoad() {

  }
}

