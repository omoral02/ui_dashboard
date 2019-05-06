import AppModel from './app_model';

export default class AppView extends AppModel {
  constructor() {
    super();
    this.setOfButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementsByTagName('main');
    this.plxButton = document.getElementById('plx_button');
    this.mapButton = document.getElementById('map_button');
    this.wsButton = document.getElementById('ws_button');
    this.staticMapButton = document.getElementById('static_map_button');
    this.viewsPane = document.createElement('section');
    this.viewsPane.id = 'views_pane';
    this.mainMenu[0].insertAdjacentElement('afterend', this.viewsPane);
    this.childViews;
  }

  checkAttachedPane() {
      console.log('Main menu child node inserted. Check attached panes for child views: ');
      // let _views = views.length;
      // for (let i = 0; i < _views; i++){
      //   let _view = _views[i];
      //   this.checkMyIndex(_view, i);
      // }
      this.childViews = [];
      this.checkMyIndex(this.viewsPane.childNodes);
  }

  checkMyIndex (views) {
      for (let i = 0; i < views.length; i++){
          let iteratedView = views[i];
          let index = i;
          let objectView = {
            view: iteratedView,
            count: index
          };
          this.childViews.push(objectView);
      }
      this.childViews.forEach((viewsObject) => {
            let object = viewsObject;
            if( object.count == 0 ){
              if ( object.view.classList.contains('one')){
                    object.view.classList.toggle('one');
                    console.log('Classlist was toggled and is now: ', object.view.classList.value);
                    } else {
                      object.view.classList.add('one');
                      console.log('Classlist is now: ', object.view.classList.value);
                    }
            } else if ( object.count == 1 ) {
                    if ( object.view.classList.contains('two')){
                            object.view.classList.toggle('two');
                            console.log('Classlist was toggled and is now: ', object.view.classList.value);
                            } else {
                              object.view.classList.add('two');
                              console.log('Classlist is now: ', object.view.classList.value);
                            }
            } else if ( object.count == 2 ) {
                    if ( object.view.classList.contains('three')){
                            object.view.classList.toggle('three');
                            console.log('Classlist was toggled and is now: ', object.view.classList.value);
                            } else {
                              object.view.classList.add('three');
                              console.log('Classlist is now: ', object.view.classList.value);
                            }
            } else {
                if ( object.view.classList.contains('four')){
                  object.view.classList.toggle('four');
                  console.log('Classlist was toggled and is now: ', object.view.classList.value);
                  } else {
                    object.view.classList.add('four');
                    console.log('Classlist is now: ', object.view.classList.value);
                  }
            }
      });    
  } 
}
