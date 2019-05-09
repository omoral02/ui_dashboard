import AppModel from './model';

export default class AppView extends AppModel {
  constructor() {
    super();
    this.head = document.getElementsByTagName('head')[0];
    console.log(this.head);
    this.viewsButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementsByTagName('main')[0];
    this.plxButton = document.getElementById('plx_button');
    this.mapsButton = document.getElementById('map_button');
    this.wsButton = document.getElementById('ws_button');
    this.staticMapButton = document.getElementById('static_map_button');
    this.viewsPane = document.createElement('section');
    this.viewsPane.id = 'views_pane';
    this.mainMenu.insertAdjacentElement('afterend', this.viewsPane);
    this.childViews = [];
  }

  checkAttachedPanes() {
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
      this.childViews.forEach((viewObject) => {
            let object = viewObject;
            if( object.count == 0 ){
                  if ( object.view.classList.contains('one')){
                        object.view.classList.toggle('one');
                        console.log('Classlist for ', object.view.id, 'was toggled and is now: ', object.view.classList.value);
                        } else {
                          object.view.classList.add('one');
                          console.log('Classlist for ', object.view.id, ' is now: ', object.view.classList.value);
                        }
            } else if ( object.count == 1 ) {
                  if ( object.view.classList.contains('two')){
                          object.view.classList.toggle('two');
                          console.log('Classlist for ', object.view.id, 'was toggled and is now: ', object.view.classList.value);
                          } else {
                            object.view.classList.add('two');
                            console.log('Classlist for ', object.view.id, ' is now: ', object.view.classList.value);
                          }
            } else if ( object.count == 2 ) {
                  if ( object.view.classList.contains('three')){
                          object.view.classList.toggle('three');
                          console.log('Classlist for ', object.view.id, 'was toggled and is now: ', object.view.classList.value);
                          } else {
                            object.view.classList.add('three');
                            console.log('Classlist for ', object.view.id, ' is now: ', object.view.classList.value);
                          }
            } else {
                  if ( object.view.classList.contains('four')){
                          object.view.classList.toggle('four');
                          console.log('Classlist for ', object.view.id, 'was toggled and is now: ', object.view.classList.value);
                    } else {
                          object.view.classList.add('four');
                          console.log('Classlist for ', object.view.id, ' is now: ', object.view.classList.value);
                    }
            }
      });    
  } 
}

