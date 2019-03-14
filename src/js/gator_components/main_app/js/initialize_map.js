export default class InitializeMap {

  constructor (Util) {
    this.Map_CTX_Globals = require('./map_ctx_globals.js');
    this.AutoCompleteDirectionsHandler = require('./autocomplete_directions_handler.js');
    this.map_ctx_globals = (()=> { return this.MapCTXGlobals.getMapsGlobals(); })();
    this.util = new Util;
    let { america, control, search, markers, ids, uniqueId } = this.map_ctx_globals;
    this.ids = ids;
    this.markers = markers;
    this.search = search;
    this.control = control;
    this.uniqueId = uniqueId;
    this.mapOptions = {
      zoom: 14,
      center: america,
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
    let	map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    map.mapTypes.set('styled_map', this.styledMapType);
    map.setMapTypeId('styled_map');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.control);

    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    let geocoder = new google.maps.Geocoder();
    this.initListeners(geocoder, map);
  }

  initListeners(geocoder, map) {
    this.autocomplete_directions_handler = new this.AutoCompleteDirectionsHandler(map, this.map_ctx_globals[0]);
    this.autocomplete_directions_handler.initListeners();

    let infoWindow = new google.maps.InfoWindow({
    content: null,
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(e) {
    const clickedMarker = require('./clicked_marker.js');
    clickedMarker(e.latLng, map, this.util, this.ids, infoWindow, this.markers, this.uniqueId);
    this.util.log('addMarker function completed at point: ' + e.latLng + ' ' + '.');
    });

    document.getElementById('submit').addEventListener('click', function(e) {
    const geocodeAddress = require('./geocode_address.js');
    geocodeAddress(geocoder, map, this.util, infoWindow, this.markers, this.ids, this.uniqueId);
    this.util.log('geoCoder submitted user\'s address input of : ' + this.search.value);
    });
  }
}