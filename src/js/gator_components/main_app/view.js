import AppModel from './model';

export default class AppView extends AppModel {
  constructor () {
    super ();
    this.head = document.getElementsByTagName('head')[0];
    this.viewsButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementsByTagName('main')[0];
    this.plxButton = document.getElementById('plx_button');
    this.mapsButton = document.getElementById('map_button');
    this.wsButton = document.getElementById('ws_button');
    this.staticMapButton = document.getElementById('static_map_button');
    this.viewsPane = document.createElement('section');
    this.viewsPane.id = 'views_pane';
    this.mainMenu.insertAdjacentElement('afterend', this.viewsPane);
    this.views; 
  }

  checkAttachedPanes () {
     if (this.childViews == []){
         this.viewsListIsEmpty ();
     } else {
         this.viewsListHasChildNodes ();
     }
    this.checkAndListChildNodes(this.views);
    this.checkEachViewIndex ();
  }

  viewsListIsEmpty () {
    this.views = this.viewsPane.childNodes;
  }

  viewsListHasChildNodes () {
    super.clearChildViews ();
    this.clearClassesOnChildNodes ();
    this.views = this.viewsPane.childNodes;
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

  clearClassesOnChildNodes () {
    let values = super.getChildViews ();
    console.log(values);
    for(let i = 0; i < values.length; i++){
      let $elInArray = values[i];
      console.log($elInArray);
      if ($elInArray.view.classList.contains('one')) {
          $elInArray.view.classList.toggle('one');
          this.listOfElementsByClass[0].classArrays[0].classList_1.pop($elInArray);
      } else if ($elInArray.view.classList.contains('two')) {
          $elInArray.view.classList.toggle('two');
          this.listOfElementsByClass[0].classArrays[0].classList_2.pop($elInArray);
      } else if ($elInArray.view.classList.contains('three')) {
          $elInArray.view.classList.toggle('three');
          this.listOfElementsByClass[0].classArrays[0].classList_3.pop($elInArray);
      } else {
          $elInArray.view.classList.toggle('four');
          this.listOfElementsByClass[0].classArrays[0].classList_4.pop($elInArray);
      }
    };
  }

  checkEachViewIndex () {
    this.childViews.forEach((viewObject) => {
        let object = viewObject;
        if( object.count == 0 ){ 
            object.view.classList.add('one');
            this.listOfElementsByClass[0].classArrays[0].classList_1.push(object);                       
          } else if ( object.count == 1 ) {
                      object.view.classList.add('two');
                      this.listOfElementsByClass[0].classArrays[0].classList_2.push(object);
          } else if ( object.count == 2 ) {
                      object.view.classList.add('three');
                      this.listOfElementsByClass[0].classArrays[0].classList_3.push(object);                   
          } else {
                      object.view.classList.add('four');
                      this.listOfElementsByClass[0].classArrays[0].classList_4.push(object)
        }
        console.log('Classlist for ', 
          object.view.id, ' is now: ', 
          object.view.classList.value, 
          ' : ');
        console.log(this.listOfElementsByClass);
        console.log(object.count);
    });    
  } 
}

