export default function clickedMarker(clickedLocation, map) {
  Util.clearConsole();
  let labels = 'Nice click!';
  let marker = new google.maps.Marker({
    position: clickedLocation,
    label: labels,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Nice Tap!'
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

  google.maps.event.addListener(marker, 'click', function() {
  	const contentClickedMarker = require('./content_clicked_marker.js');
    contentClickedMarker(marker);
    Util.log('dropped marker, first contentLoad function listener on standby' + 'InfoWindow was opened by contentLoad function for clicked-on marker: ' + marker.id);
  })
}