import AppView from './gator_components/main_app/app_view';

export default function initialize() {
  const main = new AppView();
  window.addEventListener('load', main.onLoad(), false);
}
initialize();
