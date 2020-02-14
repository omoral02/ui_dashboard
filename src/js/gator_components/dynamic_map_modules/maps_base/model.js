export default class MapModel {
  constructor(){
    this.america = {
      lat:30.2672,
      lng:-97.7431
    };
    this.markerBank = {
      markers: [],
      geocodes: [],
      ids: []
    };
    this.uniqueId = 0;
  }

  getMapParentHTML(){
    this.mapParentHtml =
       `<div id='mapMain' rel='mapTester' class=''>
          <h2 class='card-header'>Dynamic Map Testing</h2>
        </div>`;
    return this.mapParentHtml;
  }

  getMapSecondaryHTML(){
    // this.secondaryHTML = 
    //   `<div id="mapInner" class="card-inner">
    //       <ul class="card">
    //       <p>JS API V3</p>
    //       <p>
    //           <label for="center">Center:</label>
    //           <input id="center" size='40' placeholder=" Austin, TX ">
    //       </p>
    //       <p>
    //           <label for="zoom">Zoom:</label>
    //           <input id="zoom" size='40' maxlength='2'placeholder=" 14 (Accepts 1-20)">
    //       </p>
    //       <p>
    //           <label for="size">Size:</label>
    //           <input id="size" size='40' maxlength='9' placeholder=" 400x400 || 2048x2048(PP) ">
    //       </p>
    //       <p>
    //         <label for="scale">Scale:</label>
    //         <input id="scale" size='40' maxlength='2' placeholder=" 2 || 4 (default is 1) ">
    //       </p>
    //       </ul>
    //   </div>`;
    this.secondaryHTML = 
        `<div id='mapInner' class='card-inner'>
          <form name='jsgeo_api_form' id='js_form'>
            <ul>
              <label>Search:</label>
              <input type='text' size='42' class='input' id='search' placeholder='autocomplete | placeID | latlng' autofocus required>
            </ul>
            <ul id='mapButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close_dyn' title='Close this map window'>Close</button>
              <button type='button' class='exitbtn' id='res_map' title='Reset map selections'>Reset</button>
              <button type='button' class='exitbtn' id='submit_search' title='Search entry'>Search</button>
            </ul>
          </form>
        </div>`;

    // this.secondaryHTML = 
    //     `<div id='mapInner' class='card-inner'>
    //       <form name='jsgeo_api_form' id='js_form'>
    //         <ul>
    //           <label>Search:</label>
    //           <input type='text' size='42' class='input' id='search' placeholder='autocomplete | placeID' autofocus required>
    //         </ul>
    //         <ul id='mapButtonContainer' class='buttonContainer'>
    //           <button type='button' class='exitbtn' id='close_dyn' title='Close this map window'>Close</button>
    //           <button type='button' class='exitbtn' id='res_map' title='Reset map selections'>Reset</button>
    //         </ul>
    //       </form>
    //     </div>`;
    return this.secondaryHTML;
  }

  setMarker(marker){
    this.markerBank.markers.push(marker);
  }

  getMarkers (){
    this.markerBank.markers.forEach((marker)=>{
      console.log(marker.id);
    });
    return this.markerBank.markers;
  }

  clearMarkers (){
    this.uniqueId = 0;
    this.markerBank.markers = [];
  }

}
