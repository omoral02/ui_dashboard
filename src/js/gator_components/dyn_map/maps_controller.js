import MapsModel from './maps_model';

export default class MapsController extends MapsModel {
    constructor () {
        super();
    }

    init () {

    }

    registerInstanceOf (mapView) {
        this.mapView = mapView;
        this.registerObserver(this.mapView);
    }

    registerObserver (observer) {
        super.registerObserver(observer);
    }
    
}