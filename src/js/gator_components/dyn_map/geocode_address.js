export default function geocodeAddress(geocoder, map, util, infoWindow, markers, ids, uniqueId) {
		let address = document.getElementById('address').value;
		let entry = {'address': address};
		let marker;
		geocoder.geocode(entry, function(results, status) {
				if (status == 'OK') {
					map.panTo(results[0].geometry.location);
					marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						animation: google.maps.Animation.DROP,
						title: results[0].formatted_address
					});
					marker.id = uniqueId;
					uniqueId++;
					markers.push(marker);
					ids.push(uniqueId);

					util.log('Marker\'s ID in the array is ' + marker.id + '.' + ('\n') + 
					'Marker(s) pushed to \'Markers\' array within addMarker function. These are the following IDs:');
					for (let i = 0; i < markers.length; i++) {
						util.log(markers[i].id);
					}
					google.maps.event.addListener(marker, 'click', function() {
						const GeoAddressMarkerLoad = require('./geo_address_marker_load.js');
						let currentlyClickedMarker = marker;
						let locale = currentlyClickedMarker.getPosition();
						this.geo_address_marker_load = new GeoAddressMarkerLoad(currentlyClickedMarker, results, locale, util, infoWindow, markers, map, geocoder);
						this.geo_address_marker_load.open();
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				} 
		});

}