export default class DremelModel {
  constructor(){

  }

  getDremelParentHTML(){
    this.scriptsParentHtml =
       `<div id='dremelMain' rel='dremel' class=''>
          <h2 class='card-header'>Dremel Scripts</h2>
          <ul id='dremelButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close_dremel' title='Close this Dremel Window.'></button>
              <button type='button' id='gen_dremel' class='exitbtn' title='Generate URL for Dremel query.'></button>
          </ul>
          <ul class='card-inner' id='dremel-InnerCard'></ul>
        </div>`;
    return this.scriptsParentHtml;
  }

  getDremelSecondaryHTML(){
    this.secondaryHTML = 
      `<div id="dremelInner" class="card">
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
      </div>`;
    return this.secondaryHTML;
  }

}
