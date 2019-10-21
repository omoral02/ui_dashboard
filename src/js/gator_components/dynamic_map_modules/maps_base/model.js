export default class MapModel {
  constructor(){

  }

  getMapParentHTML(){
    this.scriptsParentHtml =
       `<div id='mapMain' rel='mapTester' class=''>
          <h2 class='card-header'>Dynamic Map Testing</h2>
          <ul id='mapButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close_static' title='Close this Map Window.'></button>
              <button type='button' id='gen_map' class='exitbtn' title='Generate Map w/ options config.'></button>
          </ul>
          
        </div>`;
    return this.scriptsParentHtml;
  }

  getMapSecondaryHTML(){
    this.secondaryHTML = 
      `<div id="mapInner" class="card-inner">
          <ul class="card">
          <p>JS API V3</p>
          <p>
              <label for="center">Center:</label>
              <input id="center" size='40' placeholder=" Austin, TX ">
          </p>
          <p>
              <label for="zoom">Zoom:</label>
              <input id="zoom" size='40' maxlength='2'placeholder=" 14 (Accepts 1-20)">
          </p>
          <p>
              <label for="size">Size:</label>
              <input id="size" size='40' maxlength='9' placeholder=" 400x400 || 2048x2048(PP) ">
          </p>
          <p>
            <label for="scale">Scale:</label>
            <input id="scale" size='40' maxlength='2' placeholder=" 2 || 4 (default is 1) ">
          </p>
          </ul>
      </div>`;
    return this.secondaryHTML;
  }

}
