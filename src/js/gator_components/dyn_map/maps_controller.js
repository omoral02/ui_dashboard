import MapsModel from './maps_model';
import InsertMapsBootstrap from './maps_insert';

export default class MapsController extends MapsModel {
    constructor (key) {
        super();
        this.apiKey = key;
        this.InsertMapsBootstrap = InsertMapsBootstrap
    }

    init () {
        this.maps_ = new this.InsertMapsBootstrap();
        this.maps_.insert(this.apiKey);
    }

    registerInstanceOf (mapView) {
        this.mapView = mapView;
        this.registerObserver(this.mapView);
    }

    registerObserver (observer) {
        if(observer){
            super.registerObserver(observer);
        }
    }    
}
