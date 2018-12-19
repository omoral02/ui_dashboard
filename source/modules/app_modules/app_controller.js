const main = (() => {
  // console.log('main');
  const placeholdersModel = new PlaceholdersModel();
  const scriptsModel = new ScriptsModel(placeholdersModel);
  const scriptsController = new ScriptsController(scriptsModel);
  const scriptsView = new ScriptsView(scriptsController);
  // scriptsView.scriptsController.scriptsView.init();
  // console.log(scriptsView);

});

window.addEventListener('load' main);

