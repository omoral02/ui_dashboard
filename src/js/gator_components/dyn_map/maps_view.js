import Util from '../../util';
import MapsController from './maps_controller';

export default class MapsView extends MapsController {
    constructor (placeholders, apiKey, head) {
      super(apiKey, head);
      this.map = document.getElementById('map');
      this.mapsGlobals = super.getMapsGlobals();
      this.api_key = apiKey;
      this.placeholders = placeholders;
      this.util = Util;
      this.styled_map;
    }
  
    init () {
      super.init();
    }

    toggleMapContainer () {
    //   if (!this.styled_map){
    //     async function noStyledMap() {
    //       const { default: StyledMap } = await import(/* webpackChunkName: "dynamic_map" */ './dynamic_mapView');
    //       this.styled_map = new StyledMap(this.util, this.map, this.mapsGlobals);
    //       this.styled_map.init();
    //    } 
    //    noStyledMap();
    //   }
    }
  }
  