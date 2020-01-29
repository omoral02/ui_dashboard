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
            this.primaryParentinnerHTML = ( () => {
                return super.getMapParentHTML()
            })();
            this.primaryParent.innerHTML = this.primaryParentinnerHTML;
            this.parentPane.insertBefore(
            this.primaryParent,
            this.parentPane.childNodes[0]);
            this.grabInnerComponent();
            // insert static map primary container
        } else {
                this.resetPrimaryContainerFor('all');
                // remove scripts primary container if it exists.
        }
    }

    grabInnerComponent(){
      this.secondaryParent = document.createElement('div');
      this.secondaryParent.id = 'mapSecondary';
      this.secondaryParentInnerHTML =( ()=>{
        return super.getMapSecondaryHTML();
      })();
      this.secondaryParent.innerHTML= this.secondaryParentInnerHTML;
      // this.iframe = document.createElement('iframe');
      // this.iframe.id = 'testIframe';
      // this.iframe.src = require('./index.html');
      // console.log(this.iframe.src);
      // this.secondaryParent.appendChild(this.iframe);
      this.primaryParent.appendChild(this.secondaryParent);
    }

    insertMapContainer(){
      this.search = document.getElementById('search');
      this.mapContainer = document.createElement('div');
      this.mapContainer.id = 'map';
      this.resultsPane.appendChild(this.mapContainer);
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
      this.infoWindow = new google.maps.InfoWindow({
          content: null,
        });
      this.autocomplete = new google.maps.AutocompleteService(this.search, {})
    }

    resetPrimaryContainerFor (level) {
        if ( level === 'all' ){
          this.resetChildren('children');
          if ( this.primaryParent ) {
            this.parentPane.removeChild(this.primaryParent);
          }
          this.primaryParent = null;
        } else if ( level === 'children' ) {
          this.resetChildren('children');
        } else if ( level === 'link' ) {
          this.resetChildren('link');
        }
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
