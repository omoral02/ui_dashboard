export default function clickedMarker(clickedLocation, map, util, ids, infoWindow, markers, uniqueId) {
  // util.clearConsole();
  let labels = 'Nice click!';
  let marker = new google.maps.Marker({
    position: clickedLocation,
    label: labels,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Nice Tap!',
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
  	const contentClickedMarker = require('./content_clicked_marker.js');
    contentClickedMarker(marker, map, util, infoWindow, uniqueId);
    util.log('dropped marker, first contentLoad function listener on standby' + 'InfoWindow was opened by contentLoad function for clicked-on marker: ' + marker.id);
  })
}