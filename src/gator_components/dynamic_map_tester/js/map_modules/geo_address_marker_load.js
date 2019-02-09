'use strict';

export default Class GeoAddressMarkerLoad(...args) {

	constructor () {
		let { ...args } = { ...args };
		let location = { location : locale };
		let littleWindow = document.getElementById('littleWindow');
		let panoOptions = {
			position: locale,
			pov: {
				heading: 140,
				pitch: 35,
			},
			visible:false
		};
		let contentString2 = 
		'<div id="littleWindow">' +
		'<div id="contentTestString2">' + 
		'<div id="sideNotice">' + 
		'<br>' +
		'<p id="location">Marker Location:' + '</p>' +
		'<p id="latLong">' + locale + '</p>' +
		'Marker\'s ID is : ' + currentlyClickedMarker.id +
		'<br>' +
		'Address type(s) : ' + results[0].types +
		'<br>' +
		'Marker\'s formatted address is : ' + results[0].formatted_address +
		'<br>' +
		'Location Type : ' + results[0].geometry.location_type +
		'<br>' + 
		'</div>' +
		'<br>' +
		'<form action = "">' + '<fieldset>' +
		'<input type = "button" id="buttonRemover" value="Remove Marker" onclick ="deleteMarkers(' + currentlyClickedMarker.id + ')"/>' +
		'<br>' +

		'<input type = "button" id="reverseCoder" value="Reverse GeoCode" onclick ="findAddress()"/>' +
		'<br>' +

		'<input type = "button" id="streetView" value="Toggle StreetView" onclick ="toggleStreetView()"/>' +


		'</div>' +
		'</div>' + '';
	}

	open () {
		infoWindow.setContent(contentString2);
		infoWindow.open(map, currentlyClickedMarker),
		Util.log('Marker ' + currentlyClickedMarker.id + ' was opened!');
	}

	deleteMarkers (id) {
		for (let i = 0; i < markers.length; i++) {
			if (markers[i].id == id) {
			Util.log('Marker ' + markers[i].id + ' deleted!');
			markers[i].setMap(null);
			markers.splice(i, 1);
			return;
			} 
		}  
	}

	findAddress () {
		Util.log(locale);
		geocoder.geocode(location, function statusTest(results, status) {
			Util.log('reverseGeocode STATUS is : ' + status);
			if (status == 'OK') {
				if (!findAddressMarkerRender){
					const findAddressMarkerRender = require('./map_modules/find_address_marker_render.js');
					findAddressMarkerRender(currentlyClickedMarker, results);
				}
				if (results[0]) {
				Util.log('findAddress function location result is: ' + results[0].formatted_address);
				}
			}
		});
	}

	toggleStreetView () {
		let panorama = new google.maps.StreetViewPanorama(littleWindow, panoOptions);
		panorama.innerHTML = panorama.getPano();
		let toggle = panorama.getVisible();
		if (toggle == false) {
			panorama.setVisible(true);
			} else {
			panorama.setVisible(false);
		};
	}
}