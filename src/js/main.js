<<<<<<< HEAD
import 'babel-polyfill';
import 'core-js/modules/es6.promise';
import AppView from './gator_components/main_app/app_view';

export default function initialize() {
  const main = new AppView();
  window.addEventListener('load', main.onLoad(), false);
}
initialize();
=======
import '../css/index.css'; 
import '../css/dyn_map.css';
import MainController from './gator_components/main_app/js/app_controller.js';

export default function Main() {
		const main = new MainController();
		window.addEventListener('load', function () {main.onLoad();});	
}
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
