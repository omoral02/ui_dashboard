'use strict';

export default function geocodeAddress(geocoder, map) {
  let address = document.getElementById('address').value;
  let entry = {
  	'address': address
  }
  geocoder.geocode(entry, function(results, status) {
	    if (status == 'OK') {
	      map.panTo(results[0].geometry.location);
	      let marker = new google.maps.Marker({
	        map: map,
	        position: results[0].geometry.location,
	        animation: google.maps.Animation.DROP,
	        title: results[0].formatted_address
	      });
	      marker.id = uniqueId;
	      uniqueId++;
	      markers.push(marker);
	      ids.push(uniqueId);

	     Util.log('Marker\'s ID in the array is ' + marker.id + '.' + ('\n') + 
	     	'Marker(s) pushed to \'Markers\' array within addMarker function. These are the following IDs:');
	      for (i = 0; i < markers.length; i++) {
	        Util.log(markers[i].id);
	      } 
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    } 

	    google.maps.event.addListener(marker, 'click', function() {
	    	if(!GeoAddressMarkerLoad){
	    		const GeoAddressMarkerLoad = require('./map_modules/geo_address_marker_load.js');
		    }
		    let currentlyClickedMarker = marker;
		    let locale = currentlyClickedMarker.getPosition();
		  	GeoAddressMarkerLoad.open(currentlyClickedMarker, results, locale);
	    });
  });
}