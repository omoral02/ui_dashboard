export default function contentClickedMarker(marker) {
	let contentString = '<div id = "contentTestString">' + '<div id="sideNotice">' + '<h1 id="heading" class="heading">' +
		'Click the button below to completely remove this marker.</h1>' + '<br>' +
		'<p id = "text" >You may close this window by simply cliking the X on the top right corner!.</p>' +
		'<br>' +
		'<p id="text">Marker Location:' + marker.getPosition() +
		'<br>' +
		'Marker\'s ID is :' + marker.id +
		'<br>' +
		'</p>' +
		'<form action = "">' + '<fieldset>' +
		'<input type = "button" id="buttonRemover" value="Remove This Marker" onclick ="deleteMarkers(' + marker.id + ')"/>' +
		'</div>' +
		'</div>' + '';

	infoWindow.setContent(contentString);
	infoWindow.open(map, marker),
	Util.log('Marker ' + marker.id + ' was opened!');
}