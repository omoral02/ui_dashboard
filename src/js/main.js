import '../css/index.css'; 
import '../css/dyn_map.css';
import MainController from './gator_components/main_app/js/app_controller.js';

export default function Main() {
		const main = new MainController();
		window.addEventListener('load', function () {main.onLoad();});	
}