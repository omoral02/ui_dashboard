// import Util from './util.js'; 
import DynamicMapController from './dynamic_map_controller';

export default class DynamicMap {
	constructor (util, map, mapGlobals) {
		this.dynamicMapController = new DynamicMapController(util, map, mapGlobals);
	}

	init () {
		this.dynamicMapController.init();
		console.log('ready to initialize map module!');
	}
}