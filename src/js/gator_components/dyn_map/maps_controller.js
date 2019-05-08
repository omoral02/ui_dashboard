import Util from '../../util';
import MapsView from './maps_view';

export default class MapsController extends MapsView {
    constructor (mapsButton, placeholders, viewPane, key, head) {
        super(placeholders, key, viewPane);
        this.mapsButton = mapsButton;
        this.placeholders = placeholders;
        this.apiKey = key;
        this.head = head;
        this.util = Util;
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
            const { default: StyledMap } = require('./styled_map.js');
            this.styled_map = new StyledMap(this.util, this.map, this.mapsGlobals);
            this.styled_map.init();
        }
    }

    isNowListening () {
        this.mapsButton.addEventListener('click', super.toggleMapContainer,false);
    }
}

