
import MapsModel from './maps_model';

export default class MapsView extends MapsModel {
    constructor (placeholders, apiKey, viewPane) {
      super();
      this.mapsGlobals =(()=>{super.getMapsGlobals()})();
      this.placeholders = placeholders;
      this.parentPane = viewPane;
      this.api_key = apiKey;
    }
  
    initializeMapContainerInsertion() {
      if (!this.map){
      this.map = document.createElement('div');
      this.map.id = "map";
      this.map.classList.add('card');
      this.parentPane.insertBefore(this.map, this.parentPane.childNodes[0]);
      this.map.classList.toggle('show');
      }
    }

    toggleMapContainer () {
      if (this.map.classList.contains('show')){
        this.map.classList.toggle('show');
      } else {
        this.map.classList.toggle('show');
      }
    }
  }
  