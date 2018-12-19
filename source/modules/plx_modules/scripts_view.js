class ScriptsView {
  constructor(scriptsController) {
    this.scriptsController = scriptsController;
    this.scriptsModel = this.scriptsController.scriptsModel;
    this.placeholdersModel = this.scriptsController.placeholdersModel;
    this.mainMenu = document.getElementsByTagName('main');
    this.popWindowOne = document.createElement(`section`);
    this.popWindowOne.id = 'popUp';
    this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);
    this.toggleButton = document.getElementById('plx-button');
    this.scriptsParent = document.createElement('div');
    this.scriptsParent.classList.add('card');
    this.scriptsParent.id = 'scriptsContainer';
    this.scriptsParentinnerHTML = (() => {
      return this.scriptsModel.getScriptsParentHTML();
    })();
    this.scriptsParent.innerHTML = this.scriptsParentinnerHTML;
    this.popWindowOne.insertBefore(
        this.scriptsParent, this.popWindowOne.childNodes[0]);
    this.scriptList = document.getElementById('scriptList');
    this.ListInnerContainer = document.getElementById('plx-InnerCard');
    this.parametersContainer = document.getElementById('parametersContainer');
    this.parametersInnerContainer = document.getElementById('parameters');
    this.currentlySelectedScript = null;
    this.linkLister = document.createElement('div');
    this.plxOutputButton = document.createElement('a');
    this.init();
    this.scriptsController.registerObserver(this);
  }

  init() {
    this.pullScripts(this.scriptsModel.getScripts());
    this.toggleButton.addEventListener(
        'click', this.plxButtonToggle.bind(this));
    this.ListInnerContainer.addEventListener(
        'click', this.scriptsController.onScriptClick.bind(this));
    this.parametersInnerContainer.addEventListener(
        'input', this.scriptsController.onParameterInput.bind(this));
  }

  toggleParamContainer() {
    if (this.parametersContainer) {
      this.parametersContainer.classList.toggle('show');
    }
  }

  checkShow() {
    let parametersParent = this.parametersContainer;
    if (!parametersParent.classList.contains('show')) {
      parametersParent.classList.toggle('show');
    } else {
      this.resetItems();
    }
  }

  pullScripts(scripts) {
    // scripts need to be more specific by accessing the DOM element traversing
    // the `rel` attribute for each class element that contains the attribute
    // `rel=plxScriptWindow` would then be more DOM MVC specific. then append
    // child to more specified DOM element

    scripts.forEach((script, index) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.ListInnerContainer.appendChild(li);
    })
  }

  plxButtonToggle() {
    this.scriptsParent.classList.toggle('show');
    this.resetItems();
  }

  checkActive(currentlySelectedScript, scriptIndex) {
    let item = currentlySelectedScript;
    if (item.classList.contains('listed-item')) {
      if (item.classList.contains('active')) {
        this.removeActive();
        this.scriptsController.scriptManager(scriptIndex);
      } else {
        this.removeActive();
        item.classList.toggle('active');
        this.scriptsController.scriptManager(scriptIndex);
        this.matchParams(this.placeholdersModel.getFieldSamples());
      }
    }
  }

  renderParameters(parameters) {
    let parametersHtml = '';
    parameters.forEach((parameter) => {
      parametersHtml += `<div class="innerParam"><p class="parameter">
              <label for="${parameter}">${parameter}:</label></p>
              <p><input type="text" class="input" id="${
          parameter}" placeholder="">
              </p></div>`;
    });
    this.parametersInnerContainer.innerHTML = parametersHtml;
    let linkListerHtml = '';
    linkListerHtml += `<div id="linkLister"></div>`;
    this.linkLister.innerHTML = linkListerHtml;
    this.parametersInnerContainer.appendChild(this.linkLister);
  }

  matchParams(placeholders) {
    let parameterExample = null;
    let fieldSamples = Object.entries(placeholders[0].parameters);
    fieldSamples.forEach(([key, value], index) => {
      parameterExample = document.getElementById(`${key}`);
      if (parameterExample) {
        parameterExample.setAttribute('placeholder', `${value}`);
      }
    });
  }

  renderPlxUrl() {
    this.plxOutputButton.href = null;
    this.plxOutputButton.target = '_blank';
    this.plxOutputButton.id = 'plxOutput';
    this.plxOutputButton.href = this.scriptsModel.URL;
    this.plxOutputButton.textContent = 'Head there now!';
    this.plxOutputButton.classList.add('showLink');
    this.linkLister.appendChild(this.plxOutputButton);
    console.log(this.plxOutputButton.href);
  }

  removeActive() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      item.classList.remove('active');
      this.resetLink();
    }
  }

  resetItems() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    }
    this.parametersContainer.classList.remove('show');
    this.resetLink();
  }

  resetLink() {
    this.plxOutputButton.classList.remove('showLink');
  }

  update() {
    this.scriptsModel.params = '';
    this.scriptsModel.url_add_on = '';
    this.scriptsModel.URL = null;
  }
}
