import DynamicMapView from './view'
import InitializeMap from './initialize_dynamic_map';

export default class DynamicMapController extends DynamicMapView {
    constructor (util, map, mapGlobals) {
       super(); 
       this.map = map;
       this.util = util;
       this.mapGlobals= mapGlobals;
    }

    init() {
        this.initiliaze_map_objects_and_listeners = new InitializeMap(
            this.util, 
            this.map, 
            this.mapGlobals);
		this.initiliaze_map_objects_and_listeners.initMap();
    }
}

