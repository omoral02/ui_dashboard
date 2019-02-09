'use strict';

export default function autocompleteDirectionsHandler(map) {

	let originAutocomplete = new google.maps.places.Autocomplete(
		originInput, {
		placeIdOnly: true
		});
	let destinationAutocomplete = new google.maps.places.Autocomplete(
		destinationInput, {
		placeIdOnly: true
		});
	let searchAutoComplete = new google.maps.places.Autocomplete(
		search, {
		placeIdOnly: true
		});

	let directionsDisplay = new google.maps.DirectionsRenderer({
		map:map,
		draggable: true,
		routeIndex: i,
		polylineOptions:{strokeColor:"#208000", strokeWeight:10, strokeOpacity: .95},
		panel: document.getElementById('sideBar')});

	let directionsService = new google.maps.DirectionsService;

	let stepDisplay = new google.maps.InfoWindow;

	let control = document.getElementById('bars');
	control.style.display = 'block';

	let onChangeHandler = function() {
		const calculateAndDisplayRoute = require('./map_modules/calculate_and_display_route.js');
		calculateAndDisplayRoute(directionsService, directionsDisplay, markers, stepDisplay, map);
	};
	document.getElementById('origin-input').addEventListener('change', onChangeHandler);
	document.getElementById('destination-input').addEventListener('change', onChangeHandler);
} 