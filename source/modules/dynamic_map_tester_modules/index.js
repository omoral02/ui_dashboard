var america = {
  lat: 60.199713,
  lng: 24.719375
};
var uniqueId = 1;
var markers = [];
var ids = [];
var directionsDisplayList = [];
var infoWindow;
var i;
var currentlyClickedMarker;
var map;
var geocoder;
var search = document.getElementById('address');
var submitButton = document.getElementById('submit');
var originInput = document.getElementById('origin-input');
var destinationInput = document.getElementById('destination-input');
var modeSelector = document.getElementById('mode-selector');


// End of Global Variable definitions

// Here begins Function defitions and expressions
function clearConsole() {
  console.clear();
  console.log('Console cleared!')
} // End of clearConsole function



function AutocompleteDirectionsHandler(map) {

      var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {
                  placeIdOnly: true
            });
      var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {
                  placeIdOnly: true
            });
      var searchAutoComplete = new google.maps.places.Autocomplete(
            search, {
                  placeIdOnly: true
            });

      var directionsDisplay = new google.maps.DirectionsRenderer({
            map:map,
            draggable: true,
            routeIndex: i,
            polylineOptions:{strokeColor:"#208000", strokeWeight:10, strokeOpacity: .95},
            panel: document.getElementById('sideBar')});

      var directionsService = new google.maps.DirectionsService;
      
      var stepDisplay = new google.maps.InfoWindow;

      var control = document.getElementById('bars');
      control.style.display = 'block';

      var onChangeHandler = function() {
            
            calculateAndDisplayRoute(directionsService, directionsDisplay, markers, stepDisplay, map);
      };

      document.getElementById('origin-input').addEventListener('change', onChangeHandler);
      document.getElementById('destination-input').addEventListener('change', onChangeHandler);
} // End of AutoCompleteDirectionsHandler function 



function calculateAndDisplayRoute(directionsService, directionsDisplay, markers, stepDisplay, map) {
      // Clear all preceding markers when calculating route.
      for (i = 0; i<markers.length; i++){
            markers[i].setMap(null);
      } 
     
        var start = document.getElementById('origin-input').value;
        var end = document.getElementById('destination-input').value;
        var request = {
          origin: start,
          destination: end,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          provideRouteAlternatives: true,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          drivingOptions: {
          departureTime: new Date(Date.now() + 3500000),  // for the time N milliseconds from now.
          trafficModel: 'optimistic'
          }};
       
        var colors = ['#b366ff', '#bf80ff', '#9933ff'];
        directionsService.route(request, function(result, status) {
          if (status === 'OK') {
                
               var routes = result.routes;
                for ( i = 0; i <routes.length; i++){
                       
                      directionsDisplay.setOptions({supressMarkers:true});
                            new google.maps.DirectionsRenderer({
                                  map: map,
                                  directions: result,
                                  routeIndex: i + 1,
                                  polylineOptions:{strokeColor:colors[i],strokeWeight:8, strokeOpacity: .8},
                                   
                                               });  
                                 }

            document.getElementById('warnings-panel').innerHtml = 
                     '<br>' + result.routes[0].warnings + '</br>';
                
                console.log('Direction Service Request STATUS : ' + status + result.routes)
                
            directionsDisplay.setDirections(result);
                
            showSteps(result, markers, stepDisplay, map);
                
            var route = result.routes[0];
            var summaryPanel = document.getElementById('warnings-panel');
            summaryPanel.innerHTML = '';
                
           // For each route, display summary information.
                 for (var i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    var total = 0;
                    summaryPanel.innerHTML += '<b> SUMMARY for <br></b>'
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            
                             }
                      
              } return
                 
        }); // End of directionsService.route request expression
} // End of calcualteAndDisplayRoute

function showSteps(result, markers, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = result.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          marker = markers[i] = markers[i] || new google.maps.Marker({
                map:map,
                position: myRoute.steps[i].start_location});
          attachInstructionText(
              stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
} // End of showSteps function

function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
              var navigationContent = text;
          stepDisplay.setContent(navigationContent);
          stepDisplay.open(map, marker);
        });
} // End of attachInstructionsText function 






function initMap() {
  clearConsole();
      
      
      
      // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
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
            ],
            {name: 'Styled Map'});

      
  // Map Options + NEW MAP + NEW InfoWindow
  var options = {
    zoom: 10,
    center: america,
    trafficLayer:true,
    mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
  };
      
      
  map = new google.maps.Map(document.getElementById('map'), options)
  //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(bars);
  /*
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  */    
  geocoder = new google.maps.Geocoder();
      
  new AutocompleteDirectionsHandler(map);

  infoWindow = new google.maps.InfoWindow({
    content: null,
  });

  /* !!! FIRST EVENT LISTENER OUTSIDE OF DIRECTIONS HANDLER !!! */

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    clickedMarker(event.latLng, map);
  });


  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    console.log('geoCoder submitted user\'s address input of : ' + address.value);
  });

} //End of initMap Function




function clickedMarker(location, map) {
  clearConsole();
  console.log('addMarker function completed at point: ' + location + ' ' + '.');
  var labels = 'Nice click!';
  // Marker properties for every new Marker created
  var marker = new google.maps.Marker({
    position: location,
    label: labels,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Nice Tap!'
  });

  //Set unique id
  marker.id = uniqueId;
  uniqueId++;
  // Push Markers to Array
  markers.push(marker);
  ids.push(uniqueId);

  // Console Log the location
  log();

  function log() {
    console.log('Marker\'s ID in the array is ' + marker.id + '.');
  }
  console.log("Marker(s) pushed to 'Markers' array within addMarker function. These are the following IDs:");
  for (i = 0; i < markers.length; i++) {
    console.log(markers[i].id);
  } //End of Console log function + For Loop 

  /* !!! SECOND EVENT LISTENER OUTSIDE OF DIRECTIONS HANDLER !!! */

  // Event listens to each marker click after its been created
  google.maps.event.addListener(marker, 'click', function() {
    contentClickedMarker(marker);
  })
  console.log('dropped marker, first contentLoad function listener on standby');
  console.log('InfoWindow was opened by contentLoad function for clicked-on marker: ' + marker.id);
} //End of addMarker Function


function deleteMarkers(id) {
  //Find and remove the marker from the Array
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].id == id) {
      console.log('Marker ' + markers[i].id + ' deleted!');
      //Remove the marker from Map                  
      markers[i].setMap(null);
      //Remove the marker from array.
      markers.splice(i, 1);
      return;
    } // End of IF/RETURN
  } // End of FOR LOOP  
} // End of deleteMarkers function


function contentClickedMarker(marker) {
  var contentTestString = '<div id = "contentTestString">' + '<div id="sideNotice">' + '<h1 id="heading" class="heading">' +
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

  infoWindow.setContent(contentTestString);
  infoWindow.open(map, marker),
        console.log('Marker ' + marker.id + ' was opened!');
} // End of contentLoad Function


function geocodeAddress(geocoder, map) {
  var address = document.getElementById('address').value;

  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      map.panTo(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        animation: google.maps.Animation.DROP,
        title: results[0].formatted_address
      });
      //Set unique id
      marker.id = uniqueId;
      uniqueId++;
      // Push Markers to Array
      markers.push(marker);
      ids.push(uniqueId);
      // Console Log the location
      log();
      function log() {
        console.log('Marker\'s ID in the array is ' + marker.id + '.');
      }
      console.log("Marker(s) pushed to 'Markers' array within addMarker function. These are the following IDs:");
      for (i = 0; i < markers.length; i++) {
        console.log(markers[i].id);
      } //End of Console log function + For Loop 

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    } // End of Else statement 

    google.maps.event.addListener(marker, 'click', function() {
         currentlyClickedMarker = marker;
      geoAddressMarkerLoad(marker, results);
          latLng1 = marker.getPosition();
    })
    console.log('geoAddressMarkerLoad function on standby');
  }); // End of geocoder.geocode
} // End of geocodeAddress function 



function geoAddressMarkerLoad(marker, results) {
  var contentTestString2 = 
    '<div id="littleWindow">' +
    '<div id="contentTestString2">' + 
    '<div id="sideNotice">' + 
    '<br>' +
    '<p id="location">Marker Location:' + '</p>' +
    '<p id="latLong">' + marker.getPosition() + '</p>' +
    'Marker\'s ID is : ' + marker.id +
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
    '<input type = "button" id="buttonRemover" value="Remove Marker" onclick ="deleteMarkers(' + marker.id + ')"/>' +
    '<br>' +
   
    '<input type = "button" id="reverseCoder" value="Reverse GeoCode" onclick ="findAddress()"/>' +
    '<br>' +

    '<input type = "button" id="streetView" value="Toggle StreetView" onclick ="toggleStreetView(map)"/>' +
    

    '</div>' +
    '</div>' + '';

  infoWindow.setContent(contentTestString2);
  infoWindow.open(map, marker),
        console.log('Marker ' + marker.id + ' was opened!');
} // End of geoLoadAddress Function


    

function findAddress(map, panorama) {
  /*
  var input = document.getElementById('latLong').textContent;
  var input2 =  input.replace(/\(|\)|/g, "");
  var latlngStr = input2.split(',', 2);  
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
      console.log(input);
      console.log(latlng);
      */
      
      var locale =  latLng1;
      console.log(locale);
  geocoder.geocode({
    'location':  locale 
  }, function statusTest(results, status) {
    console.log('reverseGeocode STATUS is : ' + status);

    if (status == 'OK') {
    findAddressMarkerLoad(currentlyClickedMarker, results);
      if (results[0]) {
        console.log('findAddress function location result is: ' + results[0].formatted_address);
      }
    } // End of anonymous function statusTest

    console.log('findAddressMarkerLoad should initiate infoWindow info swap');
  }); // End of geocoder.geocode
} // End of findAddress function

function findAddressMarkerLoad(marker, results) {
      
  var contentTestString3 = 
    '<div id="returnFind">'+
    '<p id="content">' + results[0].formatted_address + '' +
    ''+
    '</div>';
  infoWindow.setContent(contentTestString3);
  infoWindow.open(map, marker),
        console.log('InfoWindow updated with the formatted address!');
} // End of findAddressMarkerLoadfunction

function toggleStreetView(map, marker) {
      
     var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('littleWindow'), {
              position: latLng1,
              pov: {
                heading: 140,
                pitch: 35,
              
              },
             visible:false
              
            });
        panorama.innerHTML = panorama.getPano();
      
        var toggle = panorama.getVisible();
        if (toggle == false) {
          panorama.setVisible(true);
        } else {
          panorama.setVisible(false);
        }
} // End of toggleStreetView function 

         
      
