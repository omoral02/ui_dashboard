export default class GeoAddressMarkerLoad {

	constructor (currentlyClickedMarker, results, locale, util, infoWindow, markers, map, geocoder) {
		this.locale = locale;
		this.littleWindow = document.getElementById('littleWindow');
		this.util = util;
		this.infoWindow = infoWindow;
		this.markers = markers;
		this.currentlyClickedMarker = currentlyClickedMarker;
		this.results = results;
		this.map = map;
		this.geocoder = geocoder;
		this.panoOptions = {
			position: locale,
			pov: {
				heading: 140,
				pitch: 35,
			},
			visible:false
		};
		this.location = { location : this.locale };
		this.contentString2 = 
		'<div id="littleWindow">' +
		'<div id="contentTestString2">' + 
		'<div id="sideNotice">' + 
		'<br>' +
		'<p id="location">Marker Location:' + '</p>' +
		'<p id="latLong">' + this.locale + '</p>' +
		'Marker\'s ID is : ' + this.currentlyClickedMarker.id +
		'<br>' +
		'Address type(s) : ' + this.results[0].types +
		'<br>' +
		'Marker\'s formatted address is : ' + this.results[0].formatted_address +
		'<br>' +
		'Location Type : ' + this.results[0].geometry.location_type +
		'<br>' + 
		'</div>' +
		'<br>' +
		'<form action = "">' + '<fieldset>' +
		'<input type = "button" id="buttonRemover" value="Remove Marker" onclick ="deleteMarkers(' + this.currentlyClickedMarker.id + ')"/>' +
		'<br>' +

		'<input type = "button" id="reverseCoder" value="Reverse GeoCode" onclick ="findAddress()"/>' +
		'<br>' +

		'<input type = "button" id="streetView" value="Toggle StreetView" onclick ="toggleStreetView()"/>' +


		'</div>' +
		'</div>' + '';
	}

	open () {
		this.infoWindow.setContent(this.contentString2);
		this.infoWindow.open(this.map, this.currentlyClickedMarker);
		this.util.log('Marker ' + this.currentlyClickedMarker.id + 'was opened!');
	}

	deleteMarkers (id) {
		for (let i = 0; i < this.markers.length; i++) {
			if (this.markers[i].id == id) {
			this.util.log('Marker ' + this.markers[i].id + ' deleted!');
			this.markers[i].setMap(null);
			this.markers.splice(i, 1);
			return;
			} 
		}  
	}

	findAddress () {
		this.util.log(this.location);
		this.geocoder.geocode(this.location, function statusTest(results, status) {
			this.util.log('reverseGeocode STATUS is : ' + status);
			if (status == 'OK') {
				const findAddressMarkerRender = require('./find_address_marker_render.js');
				findAddressMarkerRender(this.currentlyClickedMarker, results, this.util, this.infoWindow, this.map);
				if (results[0]) {
				this.util.log('findAddress function location result is: ' + results[0].formatted_address);
				}
			}
		});
	}

	toggleStreetView () {
		let panorama = new google.maps.StreetViewPanorama(this.littleWindow, this.panoOptions);
		panorama.innerHTML = panorama.getPano();
		let toggle = panorama.getVisible();
		if (toggle == false) {
			panorama.setVisible(true);
			} else {
			panorama.setVisible(false);
		}
	}
}