import DynamicMapModel from './dynamic_mapModel'
import InitializeMap from './initialize_map';
import Util from '../../util'; 


export default class DynamicMapController extends DynamicMapModel {
    constructor (map) {
       super(); 
       this.map = map;
    }

    init () {
        this.initiliaze_map = new InitializeMap;
		this.initiliaze_map.initMap(Util, this.map);
    }

}