import MapsView from './view';

export default class MapsController extends MapsView {
    constructor (util, mapsButton, placeholders, viewPane, key, head) {
        super(placeholders, key, viewPane);
        this.util = util;
        this.mapsButton = mapsButton;
        this.placeholders = placeholders;
        this.apiKey = key;
        this.head = head;
    }

    init () {
        if (!this.mapsJS){
            this.insertMapsScript();
            super.initializeMapContainerInsertion();
        }
    }

    insertMapsScript () {
            this.mapsJS = document.createElement('script');
            this.mapsJS.setAttribute('rel', 'Maps_Script');
            this.mapsJS.src =
            `https://maps.googleapis.com/maps/api/js?&key=${this.api_key}`;
            this.mapsJS.addEventListener(
                'load', this.instantiateMapComponent.bind(this));
            this.head.appendChild(this.mapsJS);
        
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

    // isNowListening () {
    //     this.mapsButton.addEventListener('click', super.toggleMapContainer,false);
    // }
}

