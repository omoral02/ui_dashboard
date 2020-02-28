import MapModel from './model';

export default class MapView extends MapModel{
    constructor (placeholders, viewPane, key, head, resultsPane) {
    super();
    this.placeholders = placeholders;
    this.parentPane = viewPane;
    this.key = key;
    this.head = head;
    this.resultsPane = resultsPane;
    this.emptyString = '';
  }

    initializeView(){
        if ( !this.primaryParent ) {
            this.primaryParent = document.createElement('div');
            this.primaryParent.id = 'mapPrimaryContainer';
            this.primaryParent.classList.add('card');
            this.primaryParent.classList.add('component');
            this.primaryParent.innerHTML = super.getMapParentHTML();
            this.parentPane.insertBefore(
            this.primaryParent,
            this.parentPane.childNodes[0]);
            this.grabInnerComponent();
            return true
            // insert static map primary container
        } else {
                this.resetPrimaryContainer();
                return false
                // remove scripts primary container if it exists.
        }
    }

    grabInnerComponent(){
      this.secondaryParent = document.createElement('div');
      this.secondaryParent.id = 'mapSecondary';
      this.secondaryParent.innerHTML = super.getMapSecondaryHTML();
      // this.iframe = document.createElement('iframe');
      // this.iframe.id = 'testIframe';
      // this.iframe.src = require('./index.html');
      // console.log(this.iframe.src);
      // this.secondaryParent.appendChild(this.iframe);
      this.primaryParent.appendChild(this.secondaryParent);
      this.jsForm = document.getElementById('jsgeo_api_form');
      this.searchSubmit = document.getElementById('submit_search');
    }

    insertMapContainer(){
      if (!this.mapContainer){
        this.close = document.getElementById('close_dyn');
        this.search = document.getElementById('search');
        this.reset = document.getElementById('res_map');
        this.mapContainer = document.createElement('div');
        this.mapContainer.id = 'map';
        this.resultsPane.appendChild(this.mapContainer);
        this.mapsReady();
        return true;
      } else {
        this.resetPrimaryContainer();
        return false;
      }
    }

    // insertMapsLib(){
    //   this.mapScripts = document.createElement('script');
    //   this.mapScripts.src = `https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=${this.key}`;
    //   this.mapScripts.async = 'true';
    //   this.mapScripts.setAttribute('defer','');
    //   this.head.insertBefore(this.mapScripts, this.head.childNodes[0]);
    // }

    mapsReady(){
      this._map = new google.maps.Map(this.mapContainer, {
        zoom: 14,
        center: new google.maps.LatLng(this.america.lat, this.america.lng),
        trafficLayer: true,
        mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',]
              },
        });
      // this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.primaryParent);
      this.infoWindow = new google.maps.InfoWindow({
          content: null,
        });
      this.autocomplete = new google.maps.places.Autocomplete(this.search, 
        {
          // 'componentRestrictions': {'country': 'US'},
          // 'types': ['geocode', 'regions'],
        });
      this.geocoder = new google.maps.Geocoder();

      google.maps.event.addListener(this._map,'click', (e)=>{
          let marker = new google.maps.Marker({
            position: e.latLng,
            map: this._map,
            title: 'Marker Click',
          });
          this._map.panTo(e.latLng);
          this._map.setZoom(14);
          marker.id = this.uniqueId++
          marker.setMap(this._map);
          super.setMarker(marker);
          console.log(super.getMarkers());
          });
    }

    isValid(result){
      let target = result.input;
      let id = target.id;
      if (id === 'search'){
        if (result.dataType === 'placeId'){
          console.log('PlaceId Value:: ', result.placeId);
          this.geocoder.geocode({'placeId':result.placeId},(results, status)=>{
            if (status === 'OK') {
              console.log(results);
              this._map.fitBounds(results[0].geometry.viewport);
              this._map.panTo(results[0].geometry.location);
              let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: this._map,
                title: 'Place ID client-side geocode geometry location',
              });
              this._map.setZoom(14);
              marker.id = this.uniqueId++
              marker.setMap(this._map);
              super.setMarker(marker);
              console.log(super.getMarkers());
            }
          })
        } else if (result.dataType === 'latlng'){
          console.log('LatLng:: ', result.latLng);
          this.geocoder.geocode({'location': new google.maps.LatLng(result.latLng[0], result.latLng[1])},(results, status)=>{
            if (status === 'OK') {
              console.log(results);
              this._map.fitBounds(results[0].geometry.viewport);
              this._map.panTo(results[0].geometry.location);
              let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: this._map,
                title: 'LatLng client-side geocode geometry location',
              });
              this._map.setZoom(14);
              marker.id = this.uniqueId++
              marker.setMap(this._map);
              super.setMarker(marker);
              console.log(super.getMarkers());
            }
          })
          
        } else if (result.dataType === 'text') {
          console.log('Address Value:: ', target.value);
          this.geocoder.geocode({'address':target.value},(results, status)=>{
            if (status === 'OK') {
              console.log(results);
              this._map.panTo(results[0].geometry.location);
            } else {
              console.log(status);
            }
          })
        }
          
      }
    }

    resetPrimaryContainer () {
      this.parentPane.removeChild(this.primaryParent);
      this.resultsPane.removeChild(document.getElementById('map'));
      delete this.primaryParent;
      delete this.mapContainer;
        // if ( level === 'all' ){
        //   this.resetChildren('children');
        //   if ( this.primaryParent ) {
        //     this.parentPane.removeChild(this.primaryParent);
        //   }
        //   this.primaryParent = null;
        // } else if ( level === 'children' ) {
        //   this.resetChildren('children');
        // } else if ( level === 'link' ) {
        //   this.resetChildren('link');
        // }
      }
    resetChildren(level) {
        // if ( level == 'children' ){
        // if (  ){
        // }
        // if (  ){
        // }
        // if (  ) {
        // }
        // if (  ) {
        //
        // } else if (  ){
        //     if (  ){       
        //     }
        // }
    }

    setNull (element) {
        if ( element ){
        if ( element.id == '' ){
            element.removeAttribute('href');
        }
        super.setFullUrlTo(this.emptyString);
        element = null;
        }
    }
}
