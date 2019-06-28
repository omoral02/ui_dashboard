import ScriptsView from './view';

export default class ScriptsController extends ScriptsView {
  constructor(plxButton, placeholders, viewPane) {
    super(placeholders, viewPane);
    this.plxButton = plxButton;
  }

  init() {
    super.setInitialStateObject();
    super.initializeView();
    this.isNowListeningForParametersToggle();
  }

  isNowListeningForParametersToggle() {
    super.setMyStateToInitialWorkingState();
    this.scriptsListContainer.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
    this.close.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
  }

  onScriptTitleClick (e) {
    e.preventDefault();
    let currentlySelectedItem = e.target;
    if ( currentlySelectedItem.classList.contains('listed-item') ) {
        super.insertParametersContainer();
        let scriptIndex = parseInt(currentlySelectedItem.dataset.index);
        super.getNewWorkingState(scriptIndex, currentlySelectedItem);
        // this.myState = super.getNewWorkingState(scriptIndex, currentlySelectedItem);
        if ( this.secondaryParent.classList.contains('show') ){
              super.visualManager('remove');
              super.removeActive(super.getStateCurrentlySelectedScript());
        } else {
              super.visualManager('insert');
              this.innerComponentIsNowListening();
        }
    } else if ( currentlySelectedItem.id == 'resetLink' ){
              super.secondaryParentContainsShowRemove('link');
    } else if ( currentlySelectedItem.id == 'reset' ){
              super.secondaryParentContainsShowRemove('children');
    } else if ( currentlySelectedItem.id == 'close' ){
              super.secondaryParentContainsShowRemove('all');
    }
  }

  innerComponentIsNowListening() {
    this.parametersInnerContainer.addEventListener(
      'input', this.onParameterInput.bind(this),
       false);
    this.reset.addEventListener(
      'click', this.onScriptTitleClick.bind(this),
       false);
  }

  onParameterInput (e) {
    e.preventDefault();
    this.validateInput(e);
    
    super.generateUrlBuild()
  }

  validateInput (e) {

    if ( e.target.id == 'client_id') {

    } else if ( e.target.id == 'project_number') {

    } else if ( e.target.id == 'query_type') {

    } else if ( e.target.id == 'api_endpoint_type') {

    } else if ( e.target.id == 'table_suffix') {

    } else if ( e.target.id == 'table_column') {

    } else if ( e.target.id == 'api_key') {

    } else if ( e.target.id == 'domain') {

    } else if ( e.target.id == 'url') {

    } else if ( e.target.id == 'date_from') {

    } else if ( e.target.id == 'date_to') {

    } else if ( e.target.id == 'ip_range') {

    }
    super.setParameterValue(e.target.id, e.target.value);
  }

//   /**
//  * Parse a LatLng value from a string.
//  * @param {string} value A string that may contain a LatLng.
//  * @return {google.maps.LatLng} The latlng parsed from the input string.
//  */
//   parseLatLng (value) {
//   // Attempt to parse a latlng in this string.
//   var split = value.split(',');
//   if (split.length == 2) {
//     // Remove whitespaces from start and end, but nowhere else.
//     // Use Number() instead of parseFloat() to parse strictly only numbers.
//     // These avoid things like "7 High St, 2GB UK" => (7,2)
//     var lat = +split[0];
//     var lng = +split[1];
//     if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
//       return new google.maps.LatLng(lat, lng);
//     }
//   }
//   return null;
//   }

// /**
//  * Parse a place ID value from a string.
//  * @param {string} value A string that may contain a place ID.
//  * @return {string} The place ID parsed from the input string.
//  */
//   parsePlaceId(value) {
//   // Place IDs are web-safe strings, so they match [a-zA-Z0-9_-]+
//   // To distinguish them from valid, one-word geographical names, we check for
//   // - Short place IDs always start with "ChIJ" and are at least 27 characters.
//   // - Long place ID always start with "E" and are at least 30 characters.
//   if (!value.match(/^[a-zA-Z0-9_-]+$/)) {
//     return null;
//   }
//   if (value[0] == 'E' && value.length >= 30) {
//     return value;
//   }
//   if (value.substring(0, 4) == 'ChIJ' && value.length >= 27) {
//     return value;
//   }
//   return null;
//   }
}

