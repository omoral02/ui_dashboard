import ScriptsModel from './scripts_model'

export default class ScriptsView extends ScriptsModel {
  constructor(placeholders, viewPane) {
    super();
    this.placeholders = placeholders;
    this.parentPane = viewPane;
    this.emptyString = '';
  }

  initializeView() {
    this.insertScriptsContainer();
  }

  insertScriptsContainer () {
    if (!this.scriptsParent) {
    this.scriptsParent = document.createElement('div');
    this.scriptsParent.classList.add('card');
    this.scriptsParent.id = 'scriptsContainer';
    this.scriptsParentinnerHTML = ( () => { return super.getScriptsParentHTML(); } )();
    this.scriptsParent.innerHTML = this.scriptsParentinnerHTML;
    this.parentPane.insertBefore(this.scriptsParent, this.parentPane.childNodes[0]);
    this.grabInnerComponent();
    this.insert(super.getScripts());
    this.toggleScriptsContainerAndState();
    } else {
      this.parentPane.removeChild(this.scriptsParent);
      this.scriptsParent = null;
    }
    
  }

  grabInnerComponent () {
    this.ListInnerContainer = document.getElementById('plx-InnerCard');
    this.parametersContainer = document.getElementById('parametersContainer');
    this.parametersInnerContainer = document.getElementById('parameters');
  }

  insert (scripts) {
    scripts.forEach((script, index) => {
      let li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.ListInnerContainer.appendChild(li);
      console.log(script);
    })
  }

  toggleScriptsContainerAndState() {
    super.setInitialStateObject();
    this.resetItems();
    this.scriptsParent.classList.toggle('show');
  }

  checkShow() {
    let parametersParent = this.parametersContainer;
    if ( !parametersParent.classList.contains('show') ) {
      parametersParent.classList.toggle('show');
    } else {
      parametersParent.classList.remove('show');
      // document.removeChild(parametersParent);
      this.resetItems();
    }
  }

  visualManager () {
      this.checkActiveOn(this.myState.currentlySelectedScript);
      this.render(super.getParameterNames(this.myState.currentlySelectedScriptIndex));
  }

  checkActiveOn(currentlySelectedScript) {
    let item = currentlySelectedScript;
    if ( item.classList.contains('listed-item') ) {
      if (item.classList.contains('active')) {
        this.removeActive(item);
        super.setNewState();
      } else {
        super.setNewState();
        this.removeActive(item);
        this.matchParamsTo(this.placeholders);
        item.classList.toggle('active');
      }
    }
  }

  render(parameters) {
    let parametersHtml = '';
    parameters.forEach((parameter) => {
      parametersHtml += `<div class="innerParam"><p class="parameter">
              <label for="${parameter}">${parameter}:</label></p>
              <p><input type="text" class="input" id="${
          parameter}" placeholder="">
              </p></div>`;
    });
    this.parametersInnerContainer.innerHTML = parametersHtml;
    if (!this.linkLister) {
      this.linkLister = document.createElement('div');
      this.linkLister.innerHTML = `<div id="linkLister"></div>`;
    }
    this.parametersInnerContainer.appendChild(this.linkLister);
    this.checkShow();
  }

  matchParamsTo(placeholders) {
    let parameterExample;
    console.log(placeholders);
    let fieldSamples = Object.entries(placeholders.parameters);
    fieldSamples.forEach(([key, value], index) => {
      parameterExample = document.getElementById(`${key}`);
      if (parameterExample) {
        parameterExample.setAttribute('placeholder', `${value}`);
      }
    });
  }

  generatePlxUrl() {
    let script = super.getCurrentlySelectedScript();
    let addThis = `${script.id}?p=`;
    super.setScriptIdTo(addThis);
    console.log(addThis);
    let params = {};
    params = Object.entries(script.parameters);
    let paramBuild = '';
    params.forEach(([key, value], index) => {
      paramBuild += `${key}:${value}`;
      if (index !== params.length - 1) {
        paramBuild += ',';
      }
    });
    super.setScriptParametersTo(paramBuild);
    this.URL = super.getBasePlxUrl();
    this.URL += super.getScriptId();
    this.URL += super.getScriptParameters();
    this.renderPlxUrl();
  }

  renderPlxUrl() {
    if (!this.plxOutputButton){
      this.plxOutputButton = document.createElement('a');
      this.plxOutputButton.id = 'plxOutput';
    }
    this.plxOutputButton.target = '_blank';
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
      if ( item.classList.contains('active') ) {
        this.removeActive(item);
      }
    }
    this.resetLink();
  }

  resetLink() {
    this.setNull(this.plxOutputButton);
  }

  setNull (button) {
    if (button){
      button.removeAttribute('href');
      super.setFullUrlTo(this.emptyString);
    }
  }
}

