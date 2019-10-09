export default class StaticWSModel {
  constructor(){

  }

  getStaticMapParentHTML(){
    this.scriptsParentHtml =
       `<div id='staticMain' rel='wsTester' class='component'>
          <h2 class='card-header'>Static Map W/S Testing</h2>
          <ul id='wsButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close_static' title='Close this Static Window.'></button>
              <button type='button' id='gen_static' class='exitbtn' title='Generate URL for Static Map testing.'></button>
          </ul>
          <ul class='card-inner' id='plx-InnerCard' autofocus></ul>
        </div>`;
    return this.scriptsParentHtml;
  }

}
