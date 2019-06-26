import AppModel from './model';

export default class AppView extends AppModel {
  constructor () {
    super ();
    this.head = document.getElementsByTagName('head')[0];
    this.viewsButtons = document.getElementsByClassName('dropbtn');
    this.mainMenu = document.getElementsByTagName('main')[0];
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
    this.clearClassesOnChildNodes();
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

  clearClassesOnChildNodes () {
    let values = super.getChildViews ();
    if(values){
        for(let i = 0; i < values.length; i++){
          let $elInArray = values[i];
          if ($elInArray.view.classList.contains('one')) {
              $elInArray.view.classList.toggle('one');
              this.listOfElementsByClass[0].classArrays[0].classList_1.pop($elInArray);
            } else if ($elInArray.view.classList.contains('two')){
                $elInArray.view.classList.toggle('two');
                this.listOfElementsByClass[0].classArrays[0].classList_2.pop($elInArray);
            } else if ($elInArray.view.classList.contains('three')){
                $elInArray.view.classList.toggle('three');
                this.listOfElementsByClass[0].classArrays[0].classList_3.pop($elInArray);
            } else if  ($elInArray.view.classList.contains('four')){
                $elInArray.view.classList.toggle('four');
                this.listOfElementsByClass[0].classArrays[0].classList_4.pop($elInArray);
            } else if  ($elInArray.view.classList.contains('five')){
                $elInArray.view.classList.toggle('five');
                this.listOfElementsByClass[0].classArrays[0].classList_5.pop($elInArray);
            } else if  ($elInArray.view.classList.contains('six')){
                $elInArray.view.classList.toggle('six');
                this.listOfElementsByClass[0].classArrays[0].classList_6.pop($elInArray);
            } else if  ($elInArray.view.classList.contains('seven')){
                $elInArray.view.classList.toggle('seven');
                this.listOfElementsByClass[0].classArrays[0].classList_7.pop($elInArray);
            } else {
                $elInArray.view.classList.toggle('eight');
                this.listOfElementsByClass[0].classArrays[0].classList_8.pop($elInArray);
            }
        }
    }
  } 

  checkEachViewIndex () {
    this.views.iterable_views.forEach((viewObject) => {
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
    });    
  } 
}

