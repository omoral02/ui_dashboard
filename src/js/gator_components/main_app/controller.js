import { cl_ApiKey } from '../utilities/api_key.js';
import AppView from './view.js';
import ScriptsController from '../plx/controller.js';
import MapsController from '../dynamic_map_modules/maps_base/controller.js';
import StaticWSController from '../static_map/controller.js';
import DremelController from '../dremel/controller.js'

export default class AppController extends AppView {
  constructor(Util, require) {
    super();
    this.util = new Util();
    this.require = require;
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
          this.dremelButton,
          this.head,
          this.cl_apiKey,
          this.viewsPane,
          this.resultsPane);
  }

  instantiateControllersWith (util, placeholders, mapsButton, plxButton, staticButton, dremelButton, head, cl_apiKey, viewsPane, resultsPane) {
    if (!this.scriptsController){
        this.scriptsController = new ScriptsController(util, placeholders, plxButton, viewsPane);
    }
    if (!this.StaticWSController){
      this.staticWSController = new StaticWSController (util, placeholders, staticButton, viewsPane, cl_apiKey, head);
    }
    if (!this.mapsController){
      this.mapScripts = document.createElement('script');
      this.mapScripts.src = `https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=${this.cl_apiKey}`;
      this.mapScripts.async = 'true';
      this.mapScripts.setAttribute('defer','');
      this.head.insertBefore(this.mapScripts, this.head.childNodes[0]);
      this.mapsController = new MapsController (util, placeholders, mapsButton, viewsPane, cl_apiKey, head, resultsPane);
    }

    if (!this.dremelController){
      this.dremelController = new DremelController(util, placeholders, dremelButton, viewsPane);
    }
    this.controllerIsNowlistening();
  }

  controllerIsNowlistening() {
    // window.addEventListener('resize', this.windowEvent, false);
    this.actionButtons.forEach( (button) => {
      if (button.id === 'menu_button'){
        button.focus();
      }
      button.addEventListener(
        'click', this.oneButtonWasClicked.bind(this),
        true);
     
    });
  }

  windowEvent() {
    // super.resize();
    // super.logView();
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
}

