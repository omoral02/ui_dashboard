import AppController from './app_controller';
import ApiKey from './api_key';


export default class AppView extends AppController {
  constructor() {
    super();
    this.apiKey = ApiKey();
    this.mainMenu = document.getElementsByTagName('main');
    this.toggleButton = document.getElementById('plx-button');
    this.mapsButton = document.getElementById('dyn-map');
    this.map = document.getElementById('map');
    this.popWindowOne = document.createElement('section');
    this.popWindowOne.id = 'popUp';
    this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);

  }

  onLoad() {
    super.loadViewsWith(this.toggleButton, this.popWindowOne, this.apiKey, this.map);
    this.listen();
  }

  listen() {
    this.toggleButton.addEventListener('click', this.gotClicked.bind(this), false);
    this.mapsButton.addEventListener('click', this.mapShouldLoad.bind(this), false);
  }

  gotClicked() {
    this.checkAttachedPanes();
    super.togglePlxContainer();
  }

  mapShouldLoad () {
    this.checkAttachedPanes();
    super.toggleMapContainer();
  }

  checkAttachedPanes() {
    if (this.popWindowOne.childNodes !== undefined) {
      console.log('Main menu child node(s) inserted. Child view(s): ');
      const childViews = this.popWindowOne.childNodes;
      for (let i = 0; i < childViews.length; i++) {
        console.log(childViews[i]);
        const child = childViews[i];
        const one = 1;
        child.style.order = i + one;
      }
    }
  }
}
