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
    let viewReady = super.initializeView();
      if (viewReady === true){
        this.insertMaps();
        console.log('Map Insert')
        return
      }
      console.log('Map Eject');
  }

  insertMaps(){
    let mapReady = super.insertMapContainer();
      if (mapReady === true ){
        console.log('map ready true');
        this.isNowListening();
        this.listenForChanges();
        return
      } 
      console.log('not Map ready');
      super.resetPrimaryContainer();
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
    //  // inserting them inside the DOM
     Element.prototype.appendChild = function (element) {
       const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
       const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));
      
       const isDataImage = element.tagName === 'img' && /data:image\/svg\+xml/i.test(element.src);

       if (!isGMapAccessScript){
          // if (isDataImage) {
          //   console.log('Caught: ', element);
          //   //ignore Maps APIs image injections
          //   return appendChild.call(this, element);
          // }
           return appendChild.call(this, element);
       } else if (isGMapAccessScript){
            console.log('Tokenized: ', element.src);
            return appendChild.call(this, element);
       }
   
       // Extract the callback to call it with success data
       // (actually this part is not needed at all but maybe in the future ?)
       //const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
       //const [a, b] = callback.split('.');
       //window[a][b]([1, null, 0, null, null, [1]]);
   
       // Returns the element to be compliant with the appendChild API
      
       return element;
      }
  }

  listenForChanges(){

    this.close.addEventListener(
      'click', this.resetPrimaryContainer.bind(this), 
      false
    )
   
    // this.jsForm.addEventListener(
    //   'submit', this.searchEntrySubmission,
    //   false);

    this.reset.addEventListener(
      'click',  this.mapReset.bind(this), 
      false);

    this.searchSubmit.addEventListener(
      'click', this.searchEntrySubmission.bind(this),
      false);
    
    this.search.addEventListener(
      'input', this.onParameterInput.bind(this),
       false);

    this.autocomplete.addListener('place_changed', ()=>{
      let place = this.autocomplete.getPlace();
      console.log(place);
      if (place && place.address_components){
        if (place.geometry.viewport) {
          this._map.fitBounds(place.geometry.viewport);
          console.log('Has ViewPort Bounds');
        } else {
          console.log('No ViewPort Bounds');
          this._map.setCenter(place.geometry.location);
          this._map.setZoom(17);
        }
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

  mapReset (){
    this.markerBank.markers.forEach((marker)=>{
      marker.setMap(null);
      super.clearMarkers();
    })
  }

  searchEntrySubmission (){
    this.inputDetectedOn(this.searchSubmit);
  }

  onParameterInput (e){
    e.preventDefault();
    let node = e.target;
    this.inputDetectedOn(node);
  }

  inputDetectedOn (target){
    let inputField = target
    if ( inputField.classList.contains('input') && inputField.value.length > 2 ) {
      this.validateInputOn(inputField);
    }
  }

  validateInputOn (target) {
    let inputField = target;
        // use eval to dynamically invoke regEx functions that filter input
        // based on target id as the ids are part of the function names.
        // from `validate_input.js`.
        // ex: `this.validator.is_project_number(value, validatorFunction)` < validate project number
        // ex: `this.validator.is_case_number(value, validatorFunction)` < validate case number
        let id = inputField.id;
        console.log('Input to filter :: ' + id);
        let filteredResult = eval('this.validator.is_'+ id)(inputField);
        console.log('Does input match filter? :: ', filteredResult.matchesTest);
        this.validateOutputOn(filteredResult);
  }


  validateOutputOn (result) {
    let validationCheck = result;
    let input = validationCheck.input;
    // this regEx tests the input.value to ensure
    // there is no white-space in the tested result.
    let regEx = /[^\S+]/gi;
    console.log(validationCheck);
    if ( input.value ) {
        console.log('Whitespace in input? :: ', regEx.test(input.value));
              // add the property `validationcheck.valid`
              // to be either true or false
              // super.setParameterValue(input.id, input.value);
              if ( validationCheck.matchesFilter){
                Object.defineProperty(validationCheck, 'valid', {value:true, writable: true});
                // this.inputCount.push(validationCheck);
                this.final(validationCheck);
              } 
              // else {
              //   Object.defineProperty(validationCheck, 'valid', {value:false, writable: true});
              //   // this.inputCount.push(validationCheck);
              //   this.final(validationCheck);
            //  }    
      }
  }

  final (finalResult) {
      let final = finalResult;
      let field = final.input;
      let status = final.valid;
      if ( final && status == true ) {
        console.log('This', `${field.id}`, 'meets the minimum requirements'); 
        super.isValid(final);
        return true;
      } else if ( final && status == false ) {
        // super.isInvalid(field, status);
        console.log('This does not meet the minimum requirements for a', `${field.id}`);
        return false;
      }
        return false;
  }
}
