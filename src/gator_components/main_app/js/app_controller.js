'use strict';
/* global PlaceHoldersModel ScriptsModel ScriptsController ScriptsView */
const PlaceholdersModel = require('./placeholders_model.js');
const ScriptsModel = require('../../plx/js/scripts_model.js');
const ScriptsController = require('../../plx/js/scripts_controller.js');
const ScriptsView = require('../../plx/js/scripts_view.js');

const main = ( ()=> {
  // console.log('main');
  const placeholdersModel = new PlaceholdersModel();
  const scriptsModel = new ScriptsModel(placeholdersModel);
  const scriptsController = new ScriptsController(scriptsModel);
  const scriptsView = new ScriptsView(scriptsController);
  // scriptsView.scriptsController.scriptsView.init();
  // console.log(scriptsView);
});

window.addEventListener('load', main);
