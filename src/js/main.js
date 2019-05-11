// import "regenerator-runtime";
import Util from './util';
import AppController from './gator_components/main_app/controller';
import '.././css/dyn_map.css';
import '.././css/index.css';
// import img from '.././images/lockup.png';

export default function initialize() {
  const main = new AppController(Util);
  main.onLoadCheckForActionButtons();
}
initialize();


