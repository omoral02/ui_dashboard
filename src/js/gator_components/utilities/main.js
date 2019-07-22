import AppController from '../main_app/controller';
import Util from './util';
import '../../.././css/dyn_map.css';
import '../../.././css/index.css';

export default (function initialize() {
  const main = new AppController(Util, chrome);
})(chrome);



