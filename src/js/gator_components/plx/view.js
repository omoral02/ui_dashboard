import ScriptsModel from './model';

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
    if ( !this.primaryParent ) {
          this.primaryParent = document.createElement('div');
          this.primaryParent.id = 'scriptsPrimaryContainer';
          this.primaryParent.classList.add('card');
          this.primaryParentinnerHTML = ( () => {
            return super.getScriptsParentHTML();
          })();
          this.primaryParent.innerHTML = this.primaryParentinnerHTML;
          this.parentPane.insertBefore(
            this.primaryParent,
            this.parentPane.childNodes[0]);
          this.grabInnerComponent();
          // insert scripts primary container
    } else {
          this.resetContainerFor('all');
          // remove scripts primary container if it exists.
    }
  }

  grabInnerComponent() {
    this.scriptsListContainer = document.getElementById('plx-InnerCard');
    this.scriptButtonContainer = document.getElementById('scriptButtonContainer');
    this.reset = document.getElementById('reset');
    this.reset.textContent = 'Reset';
    this.close = document.getElementById('close');
    this.close.textContent = 'Close';
    this.generate = document.getElementById('generate');
    this.generate.textContent = 'Go to PLX';
    this.insert(super.getScripts());
  }

  insert (scripts) {
    console.log('Scripts ::', scripts);
    scripts.forEach( (script, index ) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.scriptsListContainer.insertBefore(
        li,
        this.scriptsListContainer.childNodes[0]);
    });
    this.toggleScriptsContainer();
  }

  toggleScriptsContainer() {
    this.primaryParent.classList.add('show');
  }

  resetContainerFor (level) {
    if ( level == 'all' ){
      this.resetChildren('children');
      if ( this.primaryParent ) {
        this.parentPane.removeChild(this.primaryParent);
      } 
      this.primaryParent = null;
    } else if ( level == 'children' ) {
      this.resetChildren('children');
    } else if ( level == 'link' ) {
      this.resetChildren('link');
    }
  }

  resetChildren(level) {
    if ( level == 'children' ){
      if ( this.myState.currentlySelectedScript ){
           this.myState.currentlySelectedScript.classList.remove('active');
      }
      if ( this.plxOutputLink ){
           this.scriptButtonContainer.removeChild(this.plxOutputLink);
      }
      if ( this.params ) {
           this.parametersInnerContainer.removeChild(this.params);
      }
      if ( this.secondaryParent ) {
           this.scriptsListContainer.removeChild(this.secondaryParent);
      }
    } else if ( level == 'link' ){
        if ( this.plxOutputLink ){
             this.paramButtonContainer.removeChild(this.plxOutputLink);
             this.setNull(this.plxOutputLink);
        }
    }
    this.plxOutputLink = null;
    this.params = null;
    this.secondaryParent = null;
  }

  setNull (element) {
    if ( element ){
      if ( element.id == 'plxOutput' ){
        element.removeAttribute('href');
      }
      super.setFullUrlTo(this.emptyString);
      element = null;
    }
  }

  insertParametersContainer () {
    if ( !this.secondaryParent ){
          this.secondaryParent = document.createElement('div');
          this.secondaryParent.classList.add('card');
          this.secondaryParent.id = 'secondaryContainer';
          this.secondaryParentinnerHTML = ( () => {
            return super.getParametersParentHTML();
          })();
          this.secondaryParent.innerHTML = this.secondaryParentinnerHTML;
          this.scriptsListContainer.insertAdjacentElement(
            'afterbegin',
            this.secondaryParent);
          this.grabSecondaryComponent();
    }
  }

  grabSecondaryComponent() {
    this.cardInner = document.getElementById('card-inner');
    this.parametersInnerContainer = document.getElementById('parameters');
  }

  toggleParamsContainer() {
    this.secondaryParent.classList.add('show');
  }

  checkActiveOn (script) {
    const item = script;
    if ( item.classList.contains('listed-item' )){
        if ( item.classList.contains('active' )){
             this.removeActive(item);
        } else {
             this.resetListItems();
             item.classList.add('active');
        }
    }
  }

  resetListItems() {
    const items = document.getElementsByClassName('listed-item');
    for ( let i = 0; i < items.length; i++ ){
      const item = items[i];
      if ( item.classList.contains('active' )){
           this.removeActive(item);
      }
    }
  }

  removeActive (onListedItem) {
    const item = onListedItem;
    item.classList.remove('active');
  }

  renderParams (parameters) {
    if ( !this.params ){
        this.params = document.createElement('div');
        this.params.id = 'params';
    }
    this.parametersHtml = '';
    parameters.forEach( (parameter) => {
      this.parametersHtml += super.getParameterHTML(parameter);
      this.params.innerHTML = this.parametersHtml;
      this.parametersInnerContainer.insertBefore(this.params, this.parametersInnerContainer.childNodes[0]);
    });
    this.secondaryParent.classList.toggle('show');
  }

  matchParamsTo (placeholders) {
    let parameterExample;
    const fieldSamples = Object.entries(placeholders.parameters);
    fieldSamples.forEach(( [key, value], index ) => {
      parameterExample = document.getElementById(`${key}`);
      if (parameterExample) {
        parameterExample.setAttribute('placeholder', `${value}`);
      }
    });
  }
  
  // createLinkElement() {
  //   if ( !this.plxOutputLink ){
  //     this.plxOutputLink = document.createElement('a');
  //     this.plxOutputLink.id = 'plxOutput';
  //     this.plxOutputLink.target = '_blank';
  //     this.plxOutputLink.textContent = 'Head there now!';
  //     // this.plxOutputLink.href = super.getFullUrl();
  //     this.scriptButtonContainer.insertBefore(
  //           this.plxOutputLink,
  //           this.scriptButtonContainer.childNodes[6]);
  //     }
  // }

  clickPlxUrl() {

      let url = super.getFullUrl();
      console.log(url);
      window.open(url, '_blank');
    console.log('Object representation of parameter values:: ', this.myState);
  }
}

