import { cl_ApiKey } from '../utilities/api_key';
import AppView from './view';
import ScriptsController from '../plx/controller';
import MapsController from '../dynamic_map_modules/maps_base/controller';
import StaticWSController from '../static_map/controller';

export default class AppController extends AppView {
  constructor(Util) {
    super();
    this.util = new Util();
    this.cl_apiKey = cl_ApiKey;
    this.actionButtons = [];
    this.onLoadCheckForActionButtons();
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
          this.staticMapButton,
          this.head,
          this.cl_apiKey,
          this.viewsPane,);
  }

  instantiateControllersWith (util, placeholders, mapsButton, plxButton, staticButton, head, cl_apiKey, viewsPane) {
    if (!this.scriptsController){
        this.scriptsController = new ScriptsController(util, placeholders, plxButton, viewsPane);
    }
    if (!this.StaticWSController){
      this.staticWSController = new StaticWSController (util, placeholders, staticButton, viewsPane, cl_apiKey, head);
    }
    if (!this.mapsController){
    this.mapsController = new MapsController (util, placeholders, mapsButton, viewsPane, cl_apiKey, head);
    }
    this.controllerIsNowlistening();
  }

  controllerIsNowlistening() {
    this.actionButtons.forEach( (button) => {
      if (button.id === 'menu_title'){
        button.focus();
      }
      button.addEventListener(
        'click', this.oneButtonWasClicked.bind(this),
        true);
    });
  }

  oneButtonWasClicked (e) {
    e.preventDefault();
    if (e.target.id === 'plx_button'){
        this.plxShouldLoad();
        super.menuItemClicked();
    } else if (e.target.id === 'menu_button'){
        this.menuShouldRender();
    } else if (e.target.id === 'maps_button') {
        this.mapShouldLoad();
        super.menuItemClicked();
    } else if (e.target.id === 'dremel_button') {
        
        super.menuItemClicked();
    } else if (e.target.id === 'static_map_button') {
        this.staticMapShouldLoad();
        super.menuItemClicked();
    }
    super.checkAttachedPanes();
    console.log('SPA App-level controller :: ', this);
  }

  menuShouldRender() {
    super.menuClicked();
  }

  plxShouldLoad() {
    this.scriptsController.init();
  }

  staticMapShouldLoad() {
    this.staticWSController.init();
  }
  
  mapShouldLoad() {
    this.mapsController.init();
  }

  // wsShouldLoad() {
  // }

}

