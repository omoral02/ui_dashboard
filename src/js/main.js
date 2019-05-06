import AppController from './gator_components/main_app/app_controller';
import '.././css/dyn_map.css';
import '.././css/index.css';
// import img from '.././images/lockup.png';

export default function initialize() {
  const main = new AppController();
  window.addEventListener('load', main.onLoad(), false);
}
initialize();
