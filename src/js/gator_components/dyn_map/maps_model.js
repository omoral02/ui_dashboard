export default class MapsModel {
	constructor() {
		this.map_globals = [{
			search : document.getElementById('address'),
			submitButton : document.getElementById('submit'),
			originInput : document.getElementById('origin-input'),
			destinationInput : document.getElementById('destination-input'),
			modeSelector : document.getElementById('mode-selector'),
			control : document.getElementById('bars'),
			america: {
			lat: 30.2672, 
			lng: -97.7431
			},
			markers : [],
			ids : [],
			directionsDisplayList : [],
			i : 0,
			uniqueId : 1
			}];
	}

    getMapsGlobals () {
		return this.mapGlobals;
	}
}
