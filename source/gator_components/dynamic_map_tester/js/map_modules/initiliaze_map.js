'use strict';

export default class InitializeMap {
	
	constructor () {

	  	const Map_CTX_Globals = require('./map_modules/map_ctx_globals.js');
	  	const autocompleteDirectionsHandler = require('./map_modules/autocomplete_directions_handler.js');
		const mapOptions = {
		    zoom: 14,
		    center: america,
		    trafficLayer: true,
		    mapTypeControlOptions: {
		            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		          }
	  	};
	  	const name = {
	  		name: 'Styled Map'
	  	};
    	const styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#000000'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#ffffcc'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#db4437'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#009966'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#009966'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ffffcc'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#000000'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#000000'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ffffcc'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#000000'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ffffcc'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#009966'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ffffcc'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#b3ffff'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#3399ff'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#b3ffff'}]
              }
            ], name);
	}

	initMap () {
		Util.clearConsole();
		Map_CTX_Globals.getMapsGlobals();
		let	map = new google.maps.Map(document.getElementById('map'), mapOptions);
		map.mapTypes.set('styled_map', styledMapType);
		map.setMapTypeId('styled_map');
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(bars);

		let trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);

		let geocoder = new google.maps.Geocoder();

		new autocompleteDirectionsHandler(map);

		let infoWindow = new google.maps.InfoWindow({
		content: null,
		});

		// This event listener calls addMarker() when the map is clicked.
		google.maps.event.addListener(map, 'click', function(e) {
			const clickedMarker = require('./map_modules/clicked_marker.js');
			clickedMarker(e.latLng, map);
			Util.log('addMarker function completed at point: ' + e.latLng + ' ' + '.');
		});

		document.getElementById('submit').addEventListener('click', function(e) {
			const geocodeAddress = require('/map_modules/geocode_address.js');
			geocodeAddress(geocoder, map);
			Util.log('geoCoder submitted user\'s address input of : ' + address.value);
		});
	}
} 