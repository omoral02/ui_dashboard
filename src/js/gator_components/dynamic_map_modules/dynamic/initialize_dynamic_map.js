export default class InitializeMap {

  constructor (util, map, mapsGlobals) {
    this.map_ctx_globals = mapsGlobals;
    let { america, control, search, markers, ids, uniqueId } = this.map_ctx_globals;
    this.util = util
    this.america = america;
    this.map = map;
    this.ids = ids;
    this.markers = markers;
    this.search = search;
    this.control = control;
    this.uniqueId = uniqueId;
    this.mapOptions = {
      zoom: 14,
      center: this.america,
      trafficLayer: true,
      mapTypeControlOptions: {
              mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
            }
    };
    this.name = {name: 'Styled Map'};
    this.styledMapType = new google.maps.StyledMapType(
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
          ], this.name);
  }

  initMap () {
    this.util.clearConsole();
    let	_map = new google.maps.Map(this.map, this.mapOptions);
    _map.mapTypes.set('styled_map', this.styledMapType);
    _map.setMapTypeId('styled_map');
    _map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.control);

    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(_map);

    let geocoder = new google.maps.Geocoder();
    this.initListeners(geocoder, _map);
  }

  initListeners(geocoder, _map) {
   
    // async function directionsHandler (_map) { /* webpackChunkName: "directions_Handler" */ 
      this.autocomplete_directions_handler = require('../modules/autocomplete_directions_handler')
      let autocompleteHandler = new this.autocomplete_directions_handler(_map, this.map_ctx_globals[0]);
      autocompleteHandler.initListeners();
    // }

    // directionsHandler(_map);
  

    let infoWindow = new google.maps.InfoWindow({
      content: null,
      });

    // This event listener adds a marker when the map is clicked.
    google.maps.event.addListener(_map, 'click', function(e) {
    const clickedMarker = require('../modules/clicked_marker.js');
    clickedMarker(e.latLng, _map, this.util, this.ids, infoWindow, this.markers, this.uniqueId);
    this.util.log('addMarker function completed at point: ' + e.latLng + ' ' + '.');
    });

    // This event listerner geocodes what's "submitted" in the submit address field
    document.getElementById('submit').addEventListener('click', function(e) {
    const geocodeAddress = require('../modules/geocode_address.js');
    geocodeAddress(geocoder, _map, this.util, infoWindow, this.markers, this.ids, this.uniqueId);
    this.util.log('geoCoder submitted user\'s address input of : ' + this.search.value);
    });
  }
}