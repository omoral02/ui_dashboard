import Util from './util.js'; 
import InitializeMap from './initialize_map.js';

export default class DynamicMap {
	constructor () {
	}

	init () {
		this.initiliaze_map = new InitializeMap;
		this.initiliaze_map.initMap(Util);
	}
}