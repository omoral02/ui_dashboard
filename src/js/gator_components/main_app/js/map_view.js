import InsertMapsBootstrap from './maps_insert.js';

export default class MapView {
    constructor (apiKey) {
      this.InsertMapsBootstrap = new InsertMapsBootstrap();
      this.api_key = apiKey
    }
  
    init () {
      this.maps_ = this.InsertMapsBootstrap;
      this.maps_.insert(this.api_key);
    }
  }