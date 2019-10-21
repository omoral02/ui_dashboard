import MapView from './view';

export default class MapController extends MapView {
  constructor ( util, placeholders, mapButton, viewPane, key, head ) {
        super(placeholders, viewPane);
        this.mapButton = mapButton;
        this.apikey = key;
        this.head = head;
        this.validator = util; //form input validation class
  }

  init(){
    super.initializeView();
    this.isNowListening();
  }

  isNowListening(){
  }
}
