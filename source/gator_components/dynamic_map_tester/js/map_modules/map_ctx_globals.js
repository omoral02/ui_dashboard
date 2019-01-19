'use strict';

export default class Globals = {

	constructor() {
		let america = {
		  lat: 30.2672, 
		  lng: -97.7431
		};
		let uniqueId = 1;
		let markers = [];
		let ids = [];
		let directionsDisplayList = [];
		let i;
		let search = document.getElementById('address');
		let submitButton = document.getElementById('submit');
		let originInput = document.getElementById('origin-input');
		let destinationInput = document.getElementById('destination-input');
		let modeSelector = document.getElementById('mode-selector');
	}

	getMapsGlobals() {
		let globals = this;
		return globals;
	}
}