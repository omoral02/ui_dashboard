export default function findAddressMarkerRender(marker, results) {
      
  let contentString3 = 
    '<div id="returnFind">'+
    '<p id="content">' + results[0].formatted_address + '' +
    ''+
    '</div>';
  infoWindow.setContent(contentString3);
  infoWindow.open(map, marker),
  Util.log('InfoWindow updated with the formatted address!');
}