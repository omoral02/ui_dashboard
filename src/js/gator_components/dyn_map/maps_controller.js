import MapsModel from './maps_model';

export default class MapsController extends MapsModel {
    constructor (key, head) {
        super();
        this.apiKey = key;
        this.head = head;
        this.mapsJS;
        this.styled_map;
    }

    init () {
        this.insert();
    }

    insert () {
        if (!this.mapsJS) {
            this.mapsJS = document.createElement('script');
            this.mapsJS.setAttribute('rel', 'Maps_Script');
            this.mapsJS.src =
            `https://maps.googleapis.com/maps/api/js?&key=${this.api_key}`;
            this.mapsJS.addEventListener('load', function(evemt){
                console.log(event.target.getAttribute('rel'));
                if (!this.styled_map){
                	const { default: StyledMap } = require('./styled_map.js');
                	this.styled_map = new StyledMap();
                	this.styled_map.init();
                }
            });
            this.head.appendChild(this.mapsJS);
        }
    }
}
