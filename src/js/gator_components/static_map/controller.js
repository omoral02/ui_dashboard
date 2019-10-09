import StaticWSView from './view';

export default class StaticWSController extends StaticWSView {
  constructor ( util, placeholders, mapStaticButton, viewPane, key, head ) {
        super(placeholders, viewPane);
        this.staticButton = mapStaticButton;
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
