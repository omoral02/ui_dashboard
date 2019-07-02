import MapsView from './view';

export default class MapsController extends MapsView {
    constructor (util, mapsButton, placeholders, viewPane, key, head, validate) {
        super(placeholders, key, viewPane);
        this.util = util;
        this.mapsButton = mapsButton;
        this.placeholders = placeholders;
        this.apiKey = key;
        this.head = head;
        this.validator = validate;
    }

    init () {
        if ( !this.mapsJS ){
            this.insertMapsScript();
            super.initializeMapView();
        }
    }

    insertMapsScript () {
            this.mapsJS = document.createElement('script');
            this.mapsJS.setAttribute('rel', 'Maps_Script');
            this.mapsJS.setAttribute('async', '');
            this.mapsJS.src =
            `https://maps.googleapis.com/maps/api/js?&libraries=places&key=${this.api_key}`;
            this.mapsJS.defer = true;
            
            this.head.appendChild(this.mapsJS);
            this.mapsJS.addEventListener(
                'load', this.instantiateMapComponent.bind(this));        
    }

    instantiateMapComponent (event) {
        console.log('This ', event.target.getAttribute('rel'), ' has loaded!');
        if (!this.styled_map){
            const { default: DynamicMapController } = require('./dynamic/controller');
            this.styled_map = new DynamicMapController(this.util, this.map, super.getMapsGlobals());
            console.log('ready to initialize map module!');
            this.styled_map.init();
        }
    }
}

