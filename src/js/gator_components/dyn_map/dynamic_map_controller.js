import DynamicMapView from './dynamic_map_view'
import InitializeMap from './initialize_map';

export default class DynamicMapController extends DynamicMapView {
    constructor (util, map, mapGlobals) {
       super(); 
       this.map = map;
       this.util = util;
       this.mapGlobals= mapGlobals;
    }

    init () {
        this.initiliaze_map = new InitializeMap(this.util, this.map, this.mapGlobals);
		this.initiliaze_map.initMap();
    }
}
