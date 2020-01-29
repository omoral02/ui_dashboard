import MapView from './view';

export default class MapController extends MapView {
  constructor ( util, placeholders, mapButton, viewPane, key, head, resultsPane ) {
        super(placeholders, viewPane, key, head, resultsPane);
        this.mapButton = mapButton;
        // this.apikey = key;
        // this.head = head;
        this.validator = util; //form input validation class
  }

  init(){
    super.initializeView();
    this.insertMaps();
    this.isNowListening();
  }

  insertMaps(){
    super.insertMapContainer();
    
  }
  
  isNowListening(){
     // Store old reference
     const appendChild = Element.prototype.appendChild;
  
     // All services to catch
     const urlCatchers = [
       "/AuthenticationService.Authenticate?",
       "/QuotaService.RecordEvent?"
     ];
   
     // Google Map is using JSONP.
     // So we only need to detect the services removing access and disabling them by not
     // inserting them inside the DOM
     Element.prototype.appendChild = function (element) {
       const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
       const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));
   
       if (!isGMapAccessScript) {
         
         return appendChild.call(this, element);
       } else if (isGMapAccessScript){
            return appendChild.call(this, element);
            console.log('Caught: ', element.src);
       }
   
       // Extract the callback to call it with success data
       // (actually this part is not needed at all but maybe in the future ?)
       //const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
       //const [a, b] = callback.split('.');
       //window[a][b]([1, null, 0, null, null, [1]]);
   
       // Returns the element to be compliant with the appendChild API
      
       return element;
      }
      super.mapsReady();
      this.listenForChanges();
  }

  listenForChanges(){
    this.autocomplete.addListener('place_changed', ()=>{
      let place = this.autocomplete.getPlace();
      console.log(place);
      if (place.geometry.viewport) {
        this._map.fitBounds(place.geometry.viewport);
        console.log('Has ViewPort Bounds');
      } else {
        console.log('No ViewPort Bounds');
        this._map.setCenter(place.geometry.location);
        this._map.setZoom(17);
      }
      // if (place.place_id){
      //   let placeId = place.place_id;
      //   let key = this.key;
      //   console.log(placeId);
      //   console.log(key);
      //   async function getWsResponse(){
      //     const response = await fetch('https://rest-proxy.appspot.com',{
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       mode: 'no-cors',
      //       body: {
      //         "url":`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${key}`},
      //     });
      //   }
      //   getWsResponse()
      //     .then((data)=>{
      //       const resultJson = document.createElement('div');
      //       resultJson.innerHTML = data;
      //       this.resultsPane.appendChild(resultJson);

      //       console.log(data)
      //     });
      // }

    });
  }
}
