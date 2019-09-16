import AppModel from './model';

export default class AppView extends AppModel {
  constructor () {
    super ();
    this.head = document.getElementsByTagName('head')[0];
    this.viewsButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementById('main_menu');
    this.plxButton = document.getElementById('plx_button');
    this.plxButton.textContent = 'PLX';
    // this.mapsButton = document.getElementById('map_button');
    // this.mapsButton.textContent = 'Dynamic Map'
    // this.wsButton = document.getElementById('ws_button');
    // this.wsButton.textContent = 'WS Tester';
    // this.staticMapButton = document.getElementById('static_map_button');
    // this.staticMapButton.textContent = 'Static Map';
    this.viewsPane = document.createElement('section');
    this.viewsPane.id = 'views_pane';
    this.mainMenu.insertAdjacentElement('afterend', this.viewsPane);
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
      let index = i;
      let objectView = {
        view: iteratedView,
        count: index
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
}

