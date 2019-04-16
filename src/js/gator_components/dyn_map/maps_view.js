import Util from '../../util';
import MapsController from './maps_controller';


export default class MapsView extends MapsController {
    constructor (placeholders, apiKey, map) {
      super(apiKey);
      this.placeholders = placeholders;
      this.map = map;
      this.util = Util;
      this.styled_map = null;
      this.mapsGlobals = super.getMapsGlobals();
      super.registerInstanceOf(this);
    }
  
    init () {
      
    }

    toggleMapContainer () {
      super.init();
      if (this.styled_map === undefined){
        async function noSyledMap() {
          const { default: StyledMap } = await import(/* webpackChunkName: "dynamic_mapView" */ './dynamic_mapView');
          this.styled_map = new StyledMap(this.util, this.map, this.mapsGlobals);
          this.styled_map.init();
       } 
       noSyledMap();
      }
    }
  }
  