
import MapsModel from './model';

export default class MapsView extends MapsModel {
    constructor (placeholders, apiKey, viewPane) {
      super();
      this.placeholders = placeholders;
      this.parentPane = viewPane;
      this.api_key = apiKey;
    }
  
    initializeMapView() {
      if ( !this.map ){
      this.map = document.createElement('div');
      this.map.id = "map";
      this.map.classList.add('card');
      this.parentPane.insertBefore(this.map, this.parentPane.childNodes[0]);
      }  else {
        console.log('else');
        this.toggleMapContainer();
        // remove scripts primary container if it exists. 
     }
    }

    toggleMapContainer () {
      if ( this.map.classList.contains('show') ){
           this.parentPane.removeChild(this.map);
      }
    }
  }
  