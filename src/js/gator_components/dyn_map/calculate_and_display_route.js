export default function calculateAndDisplayRoute(directionsService, directionsDisplay, stepDisplay, map, markers) {
	// Clear all preceding markers when calculating route.
	for (let i = 0; i < markers.length; i++){
	markers[i].setMap(null);
	} 
	let colors = ['#b366ff', '#bf80ff', '#9933ff'];
	let start = document.getElementById('origin-input').value;
	let end = document.getElementById('destination-input').value;
	let request = {
		origin: start,
		destination: end,
		optimizeWaypoints: true,
		travelMode: 'DRIVING',
		provideRouteAlternatives: true,
		unitSystem: google.maps.UnitSystem.IMPERIAL,
		drivingOptions: {
			departureTime: new Date(Date.now() + 3500000),
			trafficModel: 'optimistic'
		}
	};

	directionsService.route(request, function(result, status) {
		if (status === 'OK') {
			let routes = result.routes;

			for ( let i = 0; i <routes.length; i++){
				directionsDisplay.setOptions({supressMarkers:true});
				new google.maps.DirectionsRenderer({
					map: map,
					directions: result,
					routeIndex: i + 1,
					polylineOptions:{strokeColor:colors[i],strokeWeight:8,strokeOpacity:'.8'},
				});  
			}

			let warningsPanel = document.getElementById('warnings-panel');
			warningsPanel.innerHtml = '<br>' + result.routes[0].warnings + '</br>';

			console.log('Direction Service Request STATUS : ' + status + result.routes);

			directionsDisplay.setDirections(result);
			let showSteps = require('./show_steps.js');
			new showSteps(result, stepDisplay, map, markers);

			let route = result.routes[0];
			
			let summaryPanel = document.getElementById('summary-panel');
			summaryPanel.innerHTML = '';

			// For each route, display summary information.
			for(let i = 0; i < route.legs.length; i++) {
				let routeSegment = i + 1;
				summaryPanel.innerHTML += '<b> SUMMARY for <br></b>'
				summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
				'</b><br>';
				summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
				summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
				summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
			}
		}
		return   
	}); 
}