import { ApiKey } from '../utilities/api_key';
import MessagePassing from '../utilities/message_passing';
import AppView from './view';
import ScriptsController from '../plx/controller';
import MapsController from '../dynamic_map_modules/map/controller';

export default class AppController extends AppView {
  constructor(Util) {
    super();
    this.superToolId = 'lpchobgehbffcpbknlbniafpdghdcimh';
    this.util = new Util();
    this.cl_apiKey = ApiKey;
    this.actionButtons = [];
    this.onLoadCheckForActionButtons();
    this.messagePassing = new MessagePassing(this.superToolId); 
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
          this.cl_apiKey, 
          this.viewsPane,);
    this.controllerIsNowlistening();
  }

  instantiateControllersWith (util, placeholders, mapsButton, plxButton, head, cl_apiKey, viewsPane) {
    if (!this.scriptsController){
    this.scriptsController = new ScriptsController(util, placeholders, viewsPane, plxButton);
    }
    if (!this.mapsController){
    this.mapsController = new MapsController (util, placeholders, mapsButton, viewsPane, cl_apiKey, head);
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

