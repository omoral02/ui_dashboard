export default class AutocompleteDirectionsHandler {

	constructor (map, globals) {
		this.map = map;
		let { markers, origin, destination, search, control, i } = globals;
		this.markers = markers;
		let _search = search; 
		this.directionsService = new google.maps.DirectionsService;
		this.stepDisplay = new google.maps.InfoWindow;

		const originAutocomplete = new google.maps.places.Autocomplete(
			origin, {
			// placeIdOnly: true
			});
		const destinationAutocomplete = new google.maps.places.Autocomplete(
			destination, {
			// placeIdOnly: true
			});
		const searchAutoComplete = new google.maps.places.Autocomplete(
			_search, {
			// placeIdOnly: true
			});

		let directionsDisplay = new google.maps.DirectionsRenderer({
			map:map,
			draggable: true,
			routeIndex: i,
			polylineOptions:{strokeColor:'#208000', strokeWeight:10, strokeOpacity:'.95'}
			});

		directionsDisplay.setPanel(control);
		control.style.display = 'block';
	}

	onChangeHandler () {
		const calculateAndDisplayRoute = require('./calculate_and_display_route.js');
		calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.stepDisplay, this.map, this.markers);
	}

	initListeners () {
		document.getElementById('origin-input').addEventListener('change', this.onChangeHandler);
		document.getElementById('destination-input').addEventListener('change', this.onChangeHandler);
	}
}