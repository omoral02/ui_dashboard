import 'babel-polyfill';
import 'core-js/modules/es6.promise';
import AppView from './gator_components/main_app/app_view';

export default function initialize() {
  const main = new AppView();
  window.addEventListener('load', main.onLoad(), false);
}
initialize();
