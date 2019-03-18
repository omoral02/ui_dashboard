export default class MapsModel {
	constructor() {
        this.observers = [];
		this.map_globals = [{
			america: {
			lat: 30.2672, 
			lng: -97.7431
			},
			markers : [],
			ids : [],
			directionsDisplayList : [],
			i : 0,
			uniqueId : 1,	
			search : document.getElementById('address'),
			submitButton : document.getElementById('submit'),
			originInput : document.getElementById('origin-input'),
			destinationInput : document.getElementById('destination-input'),
			modeSelector : document.getElementById('mode-selector'),
			control : document.getElementById('bars')
			}];
	}

    getMapsGlobals () {
		return this.map_globals;
    }

    registerObserver (observer) {
        this.observers.push(observer);
    }
}
