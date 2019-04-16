import DynamicMapModel from './dynamic_mapModel'
import InitializeMap from './initialize_map';

export default class DynamicMapController extends DynamicMapModel {
    constructor (util, map, mapGlobals) {
       super(); 
       this.map = map;
       this.util = util;
       this.mapGlobals= mapGlobals;
    }

    init () {
        this.initiliaze_map = new InitializeMap;
		this.initiliaze_map.initMap(this.util, this.map, this.mapGlobals);
    }
}
