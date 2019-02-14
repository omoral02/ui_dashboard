import PlaceholdersModel from './placeholders_model.js';
import ScriptsModel from './scripts_model.js';
import ScriptsController from './scripts_controller.js';
import AppView from './app_view.js';
import ScriptsView from './scripts_view.js';
import MapView from './map_view.js';

export default class MainController {
	constructor () {
	}

	controllerLoads () {
		const placeholders_model = new PlaceholdersModel();
		const scripts_model = new ScriptsModel(placeholders_model);
		const scripts_controller = new ScriptsController(scripts_model);
		const scripts_view = new ScriptsView(scripts_controller);
		const map_view = new MapView();
		const app_view = new AppView(scripts_view, map_view);
		app_view.listenForDomInsert();
	}

	onLoad () {	
		this.controllerLoads();
	}
}