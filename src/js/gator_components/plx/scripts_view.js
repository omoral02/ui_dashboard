import ScriptsController from './scripts_controller'

export default class ScriptsView extends ScriptsController {
  constructor(placeholders, button, popWindowOne) {
    super();
    this.placeholders = placeholders;
    this.toggleButton = button;
    this.popWindowOne = popWindowOne;
    this.scripts = (() => {
      return super.getScripts();
    })();
    this.scriptsParent = document.createElement('div');
    this.scriptsParent.classList.add('card');
    this.scriptsParent.id = 'scriptsContainer';
    this.scriptsParentinnerHTML = (() => {
      return this.getScriptsParentHTML();
    })();
    this.scriptsParent.innerHTML = this.scriptsParentinnerHTML;
    this.popWindowOne.insertBefore(
      this.scriptsParent, this.popWindowOne.childNodes[0]);
    this.scriptList = document.getElementById('scriptList');
    this.ListInnerContainer = document.getElementById('plx-InnerCard');
    this.parametersContainer = document.getElementById('parametersContainer');
    this.parametersInnerContainer = document.getElementById('parameters');
    this.linkLister = document.createElement('div');
    this.plxOutputButton = document.createElement('a');
    this.plxOutputButton.id = 'plxOutput';
    this.plxOutputButton.target = '_blank';
    super.registerInstanceOf(this);
  }

  init() {
    this.pull(this.scripts);
    this.startsListening();
  }

  pull(scripts) {
    console.log(scripts);
    scripts.forEach((script, index) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.ListInnerContainer.appendChild(li);
      console.log(script);
    })
  }

  startsListening() {
    this.ListInnerContainer.addEventListener(
      'click', super.onScriptClick.bind(this), false);
    this.parametersInnerContainer.addEventListener(
      'onChange', super.onParameterInput.bind(this), false);
  }

  toggleScriptsContainer() {
    this.scriptsParent.classList.toggle('show');
    this.resetItems();
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

  checkActive(currentlySelectedScript, scriptIndex) {
    let item = currentlySelectedScript;
    if (item.classList.contains('listed-item')) {
      if (item.classList.contains('active')) {
        this.removeActive(item);
        if (this.plxOutputButton !== undefined ){ this.resetLink();}
        super.scriptManager(scriptIndex);
      } else {
        this.removeActive(item);
        super.scriptManager(scriptIndex);
        this.matchParams(this.placeholders);
        item.classList.toggle('active');
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
    this.plxOutputButton.href = super.getFullUrl();
    this.plxOutputButton.textContent = 'Head there now!';
    this.plxOutputButton.classList.add('showLink');
    this.linkLister.appendChild(this.plxOutputButton);
    console.log(this.plxOutputButton.href);
  }

  removeActive(onListedItem) {
    const item = onListedItem;
    item.classList.remove('active');
  }

  resetItems() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.classList.contains('active')) {
        this.removeActive(item);
      }
    }
    this.parametersContainer.classList.remove('show');
    this.resetLink();
  }

  resetLink() {
    this.setNull();
  }

  updateView() {
    this.setNull();
  }

  setNull () {
    if (this.plxOutputButton){
      this.plxOutputButton.removeAttribute('href');
      const emptyString = '';
      super.setFullUrlTo(emptyString);
    }
  }
}
