export default class InitializeMap {

  constructor (util, map, mapsGlobals) {
    this.map_ctx_globals = mapsGlobals;
    console.log(this.map_ctx_globals)
;    let { america, control, search, markers, ids, uniqueId } = this.map_ctx_globals;
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
    this.infoWindow = new google.maps.InfoWindow({
      content: null,
      });
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

      this.self = this;
  }

  initMap () {
    // this.util.clearConsole();
    this._map = new google.maps.Map(this.map, this.mapOptions);
    this._map.mapTypes.set('styled_map', this.styledMapType);
    this._map.setMapTypeId('styled_map');
    this._map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.control);
    this.trafficLayer = new google.maps.TrafficLayer();
    this.trafficLayer.setMap(this._map);

    this.geocoder = new google.maps.Geocoder();
    this.initListeners( this._map, this.self, this.infoWindow);
  }

  initListeners(_map, context, infoWindow) {
    this.asyncDirectionsHandler(_map, context);
    google.maps.event.addListener(_map, 'click', this.asyncClickFunction.bind(this, infoWindow));
    // document.getElementById('submit').addEventListener('click', this.asyncGeocoderFunction.bind(this));
  }

  asyncDirectionsHandler (_map, context) {
    async function directionsHandler (_map, context){
          const { default: AutocompleteDirectionsHandler } = await import(
          /* webpackChunkName: "directions_handler_class" */
          '../../modules/autocomplete_directions_handler');
          const autocompleteHandler = new AutocompleteDirectionsHandler(_map, context.map_ctx_globals[0]);
          autocompleteHandler.initListeners();
    }
    directionsHandler(_map, context);

  }

  asyncClickFunction (e, infoWindow) {
      async function clickedMarker (latLng, map, util, ids, infoWindow, markers, uniqueId) {
            const { default: clickedMarker } = await import(
            /* webpackChunkName: "clicked_marker_function" */
            '../../modules/clicked_marker.js');
            clickedMarker(latLng, map, util, ids, infoWindow, markers, uniqueId);
            util.log('addMarker function completed at point: ' + latLng + ' ' + '.');
      }
      clickedMarker(e.latLng, this._map, this.util, this.ids, infoWindow, this.markers, this.uniqueId);
  }

  asyncGeocoderFunction () {
      async function geocodeAddress(geocoder, _map, util, infoWindow, markers, ids, uniqueId) {
            const { default: geocodeAddress } = await import(
            /* webpackChunkName: "geocode_address_function" */
            '../../modules/geocode_address.js');
            geocodeAddress(geocoder, _map, util, infoWindow, markers, ids, uniqueId);
            this.util.log('geoCoder submitted user\'s address input of : ' + this.search.value);
            }
        geocodeAddress(this.geocoder, this._map, this.util, this.infoWindow, this.markers, this.ids, this.uniqueId);
  }
}
