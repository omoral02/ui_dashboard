export default class StaticWSModel {
  constructor(){

  }

  getStaticMapParentHTML(){
    this.scriptsParentHtml =     
       `<div id='staticMain' rel='staticTester' class='card-inner'>
          <h2 class='card-header'>Static Map W/S Tester</h2>
            <div id='staticParametersForm' class='parametersForm'>
                <form id="staticForm" name="static_form">
                    <ul id='wsButtonContainer' class='buttonContainer'>
                      <button type='button' class='exitbtn' id='close_static' title='Close this Static Maps Window.'></button>
                      <button type='button' class='exitbtn' id='reset_static' title='Reset form.'></button>
                      <input type='submit' id='gen_static' class='exitbtn' title='Generate URL for Static Map.'>
                    </ul>
                  </form>
             </div>
         </div>`;
    return this.scriptsParentHtml;
  }

  getStaticSecondaryHTML(){
    this.secondaryHTML = 
      `<div id="staticInner" class="card component">
          <p>https://maps.googleapis.com/maps/api/staticmap?</p>
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
