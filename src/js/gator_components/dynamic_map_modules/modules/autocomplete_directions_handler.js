export default class AutocompleteDirectionsHandler {

	constructor (map, globals) {
		this.map = map;
		const { markers, origin, destination, search, control, i } = globals;
		const directionsConfig = {
			map: this.map,
			draggable: true,
			routeIndex: i,
			polylineOptions:{strokeColor:'#208000', strokeWeight:10, strokeOpacity:'.95'}
		};
		// this.directionsService = new google.maps.DirectionsService();
		// this.stepDisplay = new google.maps.InfoWindow();
		// this.originAutocomplete = new google.maps.places.Autocomplete(origin, {});
		// this.destinationAutocomplete = new google.maps.places.Autocomplete(destination, {});
		// this.searchAutoComplete = new google.maps.places.Autocomplete(_search, {});
		// this.directionsDisplay = new google.maps.DirectionsRenderer(directionsConfig);

		// directionsDisplay.setPanel(control);
		// control.style.display = 'block';
	}

	initListeners () {
		// this.originAutocomplete.addEventListener('change', this.onChangeHandler);
		// document.getElementById('origin-input').addEventListener('change', this.onChangeHandler);

		// this.destinationAutocomplete.addEventListener('change', this.onChangeHandler);
		// document.getElementById('destination-input').addEventListener('change', this.onChangeHandler);
	}

	onChangeHandler () {
		const calculateAndDisplayRoute = require('./calculate_and_display_route.js');
		calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.stepDisplay, this.map, markers);
	}
}