import AppModel from './model';

export default class AppView extends AppModel {
  constructor () {
    super ();
    this.head = document.getElementsByTagName('head')[0];
    this.viewsButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementById('main_menu');
    this.menuBotton = document.getElementById('menu_title');
    this.menuButtons = document.getElementById('menu_options');
    this.plxButton = document.getElementById('plx_button');
    this.plxButton.textContent = 'PLX Scripts';
    // this.mapsButton = document.getElementById('maps_button');
    // this.mapsButton.textContent = 'Dynamic Map Testing';
    // this.dremelButton = document.getElementById('dremel_button');
    // this.dremelButton.textContent = 'Dremel';
    // this.staticMapButton = document.getElementById('static_map_button');
    // this.staticMapButton.textContent = 'Static Map W/S Tester';
    this.firstHalf = document.getElementById('firstHalf');
    this.secondHalf = document.getElementById('secondHalf');
    this.results = document.getElementById('results');
    this.viewsPane = document.getElementById('views_pane');
    // this.wsButton = document.getElementById('ws_button');
    // this.wsButton.textContent = 'WS Tester';
    this.secondHalf.insertBefore(this.viewsPane, this.secondHalf.childNodes[0]);
    this.viewportWidth;
    this.viewportHeight
    this.minimumWindow;
  }

  menuClicked() {
    this.menuButtons.classList.toggle('visible');
    this.firstHalf.classList.toggle('visible');
    if ( this.actionButtons[0]){
         this.actionButtons[0].focus();
    }
  }

  menuItemClicked() {
    this.menuClicked();
  }

  checkAttachedPanes () {
     if (this.views.iterable_views !== []){
        this.viewsListHasChildNodes ();
     } else {
        super.resetChildViews ();
        let views = this.viewsPane.childNodes;
        this.views.non_iterableViews = views;
        this.checkAndListChildNodes(this.views.non_iterableViews);
     }
  }

  viewsListHasChildNodes() {
    super.resetChildViews();
    let views = this.viewsPane.childNodes;
    this.checkAndListChildNodes(views);
    this.checkEachViewIndex();
  }

  checkAndListChildNodes (views) {
    for (let i = 0; i < views.length; i++){
      let iteratedView = views[i];
      // let index = i;
      let objectView = {
        view: iteratedView,
        count: i
      };
      super.setNewChildView(objectView);
    }
  }

  checkEachViewIndex () {
    if (this.views.iterable_views.length > 0){
      console.table('Child componenets of the SPA :: ', this.views.iterable_views);
      this.views.iterable_views.forEach(this.setOrder);
    }
  }

  setOrder(viewObject, i, arr){
      let object = viewObject;
          object.view.style.order = `${i}`;
          object.count = [i];
  }

  resize(){
    // console.log('Window resize');
    this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this.minimumWindow = [700, 520];
    let current = [this.viewportWidth, this.viewportHeight];
    let ceiling = [];
    let i = 2;
    while(i-- > 0){
      ceiling[i] = this.minimumWindow[i] > current[i] ? this.minimumWindow[i] : current[i];
    }
    console.log(`Ceiling:: W=${ceiling[0]}, H=${ceiling[1]}`)
    if (this.viewportWidth > 640) {
      console.log('Current width:: ', current[0], 'Current Height:: ', current[1]);
    } else {
      console.log('Width to restrict by:: ', current[0], 'Height to restrict by:: ', current[1]);
    }
  }

  logView(){
    // console.log(this.minimum);
    if (this.viewportWidth > 640){
      console.log(`WIDE :: W=${this.viewportWidth}, H=${this.viewportHeight}`);
    } else {
      console.log(`SMALL :: W=${this.viewportWidth}, H=${this.viewportHeight}`);
    }
  }
}
