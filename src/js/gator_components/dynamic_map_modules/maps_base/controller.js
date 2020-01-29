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
   
       if (isGMapAccessScript) {
         
         return appendChild.call(this, element);
       }
   
       // Extract the callback to call it with success data
       // (actually this part is not needed at all but maybe in the future ?)
       //const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
       //const [a, b] = callback.split('.');
       //window[a][b]([1, null, 0, null, null, [1]]);
   
       // Returns the element to be compliant with the appendChild API
       console.log('Caught: ', element.src);
       return element;
      }
      super.mapsReady();
  }
}
