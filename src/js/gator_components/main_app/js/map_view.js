import InsertMapsBootstrap from './maps_insert.js';
let _InsertMapsBootstrap = InsertMapsBootstrap;

export default class MapView {
    constructor (apiKey) {
      this.InsertMapsBootstrap = new _InsertMapsBootstrap();
      this.api_key = apiKey
    }
  
    init () {
      this.maps_ = this.InsertMapsBootstrap;
      this.maps_.insert(this.api_key);
    }
  }