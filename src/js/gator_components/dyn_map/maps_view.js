import InsertMapsBootstrap from './maps_insert';
import MapsController from './maps_controller';


export default class MapsView extends MapsController {
    constructor (placeholders, apiKey, map) {
      super();
      this.placeholders = placeholders;
      this.InsertMapsBootstrap = InsertMapsBootstrap
      this.api_key = apiKey;
      this.map = map;
      this.styled_map = null;
      super.registerInstanceOf(this);
    }
  
    init () {
      this.maps_ = new this.InsertMapsBootstrap();
      this.maps_.insert(this.api_key);
      window.addEventListener('insert', function(){
       console.log('The maps script was inserted');
      });
    }

    toggleMapContainer () {
      if (this.styled_map === undefined){
        async function noSyledMap() {
          const { default: StyledMap } = await import(/* webpackChunkName: "dynamic_mapView" */ './dynamic_mapView');
          this.styled_map = new StyledMap(this.map);
          this.styled_map.init();
       }
      }
    }
  }