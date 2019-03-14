import AppController from './app_controller';

export default class AppView extends AppController {
  constructor() {
    super();
    this.mainMenu = document.getElementsByTagName('main');
    this.toggleButton = document.getElementById('plx-button');
    this.popWindowOne = document.createElement('section');
    this.popWindowOne.id = 'popUp';
    this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);

  }

  onLoad() {
    super.loadViewsWith(this.toggleButton, this.popWindowOne);
    this.listen();
  }

  listen() {
    this.toggleButton.addEventListener('click', this.gotClicked.bind(this), false);
  }

  gotClicked() {
    this.checkAttachedPanes();
    super.togglePlxContainer();
  }

  checkAttachedPanes() {
    if (this.popWindowOne.childNodes !== undefined) {
      console.log('Node has been inserted. Childnodes : ');
      console.log(`${this.popWindowOne.childNodes.length}`);
      const childNodes = this.popWindowOne.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        console.log(childNodes[i]);
        const child = childNodes[i];
        const one = 1;
        child.style.order = i + one;
      }
    }
  }
}
