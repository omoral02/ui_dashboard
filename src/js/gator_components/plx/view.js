import ScriptsModel from './model'

export default class ScriptsView extends ScriptsModel {
  constructor (placeholders, viewPane) {
    super();
    this.placeholders = placeholders;
    this.parentPane = viewPane;
    this.emptyString = '';
  }

  initializeView() {
    this.insertScriptsContainer();
  }

  insertScriptsContainer () {
    if (!this.primaryParent) {
        this.primaryParent = document.createElement('div');
        this.primaryParent.classList.add('card');
        this.primaryParent.id = 'scriptsPrimaryContainer';
        this.primaryParentinnerHTML = ( () => { 
          return super.getScriptsParentHTML()
        })();
        this.primaryParent.innerHTML = this.primaryParentinnerHTML;
        this.parentPane.insertBefore(
        this.primaryParent, 
        this.parentPane.childNodes[0]);
        this.grabInnerComponent();
        console.log(this.primaryParent);
        // insert scripts primary container
    } else {
        this.resetPrimaryContainerFor('all');
        // remove scripts primary container if it exists. 
    }
  }

  grabInnerComponent() {
    this.ListInnerContainer = document.getElementById('plx-InnerCard');
    this.close = document.getElementById('close');
    this.close.textContent = 'Close';
    this.insert(super.getScripts());
  }

  insert (scripts) {
    scripts.forEach((script, index) => {
      let li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.ListInnerContainer.insertBefore(
        li,
        this.ListInnerContainer.childNodes[0]);
      console.log(script);
    })
    this.toggleScriptsContainer();
  }

  toggleScriptsContainer() {
    this.primaryParent.classList.toggle('show');
  }

  insertParametersContainer () {
    if (!this.secondaryParent){
        this.secondaryParent = document.createElement('div');
        this.secondaryParent.classList.add('card');
        this.secondaryParent.id = 'secondaryContainer';
        this.secondaryParentinnerHTML = ( () => {
          return super.getParametersParentHTML()
        })();
        this.secondaryParent.innerHTML = this.secondaryParentinnerHTML;
        this.primaryParent.insertBefore(
        this.secondaryParent,
        this.primaryParent.childNodes[1]);
        this.grabSecondaryComponent();
    } 
  }

  grabSecondaryComponent() {
    this.cardInner = document.getElementById('card-inner');
    this.parametersInnerContainer = document.getElementById('parameters');
    this.paramButtonContainer = document.getElementById('paramButtonContainer');
    this.reset = document.getElementById('reset');
    // if (!this.linkLister) {
    //   this.linkLister = document.createElement('div');
    //   this.linkLister.classList.add('dropbtn');
    //   this.linkLister.id = 'linkLister';
    //   // this.paramButtonContainer.insertBefore(
    //   //   this.linkLister,
    //   //   this.paramButtonContainer.childNodes[1]);
    // }
  }

  toggleParamsContainer() {
    this.secondaryParent.classList.toggle('show');
  }

  visualManager (value) {
    if (value === 'remove') {
      this.secondaryParentContainsShowRemove('children');
    } else if (value == 'insert') {
        this.insertParametersContainer();
        this.renderParams(super.getParameterNames(this.myState.currentlySelectedScriptIndex));
        this.matchParamsTo(this.placeholders);
    }
    this.checkActiveOn(this.myState.currentlySelectedScript);
  }

  checkActiveOn (script) {
    let item = script
    if ( item.classList.contains('listed-item') ) {
        if (item.classList.contains('active')) {
          this.removeActive(item);
        } else {
          this.resetListItems();
          item.classList.add('active');
        }
    }
  }

  secondaryParentContainsShowRemove (level) {
    this.resetPrimaryContainerFor(level);
  }

  resetPrimaryContainerFor (level) {
    if (level == 'all'){
      this.resetChildren();
      if (this.primaryParent) {
        this.parentPane.removeChild(this.primaryParent);
      } 
      this.primaryParent = null;
    } else if (level == 'children') {
      this.resetChildren();
    }
    this.setNull(this.plxOutputLink);
  }


  setNull (button) {
    if (button){
      button.removeAttribute('href');
      super.setFullUrlTo(this.emptyString);
    }
  }

  resetListItems() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if ( item.classList.contains('active') ) {
           this.removeActive(item);
      }
    }
  }

  removeActive (onListedItem) {
    let item = onListedItem;
    item.classList.remove('active');
  }

  resetChildren() {
    if (this.myState.currentlySelectedScript){
      this.myState.currentlySelectedScript.classList.remove('active');
    }
    if (this.plxOutputLink){
      this.paramButtonContainer.removeChild(this.plxOutputLink);
    }
    if (this.params) {
      this.parametersInnerContainer.removeChild(this.params);
    }
    if (this.secondaryParent) {
      this.primaryParent.removeChild(this.secondaryParent);
    }
    this.plxOutputLink = null;
    this.params = null;
    this.secondaryParent = null;
  }

  renderParams (parameters) {
    if ( !this.params){
        this.params = document.createElement('div');
        this.params.id = 'params';
    }
    this.parametersHtml = '';
    parameters.forEach((parameter) => {
      this.parametersHtml += `<div class="innerParam"><p class="parameter">
              <label for="${parameter}">${parameter}:</label></p>
              <p><input type="text" class="input" id="${
          parameter}" placeholder="">
              </p></div>`;
      this.params.innerHTML = this.parametersHtml;
      this.parametersInnerContainer.insertBefore(this.params, this.parametersInnerContainer.childNodes[0]);
    });
    this.secondaryParent.classList.toggle('show');
  }

  matchParamsTo (placeholders) {
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
    this.myState.URL = super.getBasePlxUrl();
    this.myState.URL += super.getScriptId();
    this.myState.URL += super.getScriptParameters();
    this.renderPlxUrl();
  }

  renderPlxUrl() {
    if (!this.plxOutputLink){
          this.plxOutputLink = document.createElement('a');
          this.plxOutputLink.id = 'plxOutput';
          this.plxOutputLink.target = '_blank';
          this.plxOutputLink.href = super.getFullUrl();
          this.plxOutputLink.textContent = 'Head there now!';
          this.plxOutputLink.classList.add('showLink');
          this.paramButtonContainer.insertBefore(
                this.plxOutputLink,
                this.paramButtonContainer.childNodes[2]);
          console.log(this.myState);
    } else {

    }
  }
}

