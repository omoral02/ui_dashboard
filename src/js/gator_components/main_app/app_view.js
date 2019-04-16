import AppController from './app_controller';

export default class AppView extends AppController {
  constructor() {
    super();
    this.mainMenu = document.getElementsByTagName('main');
    this.toggleButton = document.getElementById('plx-button');
    this.mapsButton = document.getElementById('dyn-map');
    this.map = document.getElementById('map');
    this.popWindowOne = document.createElement('section');
    this.popWindowOne.id = 'popUp';
    this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);

  }

  onLoad() {
    super.loadViewsWith(this.toggleButton, this.popWindowOne, this.map);
    this.isNowlistening();
  }

  isNowlistening() {
    console.log('app listeners: On');
    this.toggleButton.addEventListener('click', this.plxShouldLoad.bind(this), false);
    this.mapsButton.addEventListener('click', this.mapShouldLoad.bind(this), false);
    window.addEventListener('insert', function(){
      console.log('The maps script was inserted');
     });
  }

  plxShouldLoad() {
    this.checkAttachedPanes();
    super.togglePlxContainer();
  }

  mapShouldLoad() {
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
