
// require(['require', 'strip-ansi'], (require)=> {
//   let module_ = require('strip-ansi');
//   return module_;
// });
import '../../.././css/dyn_map.css';
import '../../.././css/index.css';
import Util from './util';
import AppController from '../main_app/controller';

export default (function initialize(util) {
  return new AppController(util);
  
})(Util);



