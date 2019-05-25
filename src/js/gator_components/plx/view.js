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
    if ( !this.primaryParent ) {
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
          // insert scripts primary container
    } else {
          this.resetPrimaryContainerFor('all');
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
    this.insert(super.getScripts());
  }

  insert (scripts) {
    scripts.forEach( (script, index ) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.scriptsListContainer.insertBefore(
        li,
        this.scriptsListContainer.childNodes[0]);
      console.log(script);
    })
    this.toggleScriptsContainer();
  }

  toggleScriptsContainer() {
    this.primaryParent.classList.toggle('show');
  }

  insertParametersContainer () {
    if ( !this.secondaryParent ){
          this.secondaryParent = document.createElement('div');
          this.secondaryParent.classList.add('card');
          this.secondaryParent.id = 'secondaryContainer';
          this.secondaryParentinnerHTML = ( () => {
            return super.getParametersParentHTML()
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
    this.secondaryParent.classList.toggle('show');
  }

  visualManager (value) {
    if ( value === 'remove' ) {
      this.secondaryParentContainsShowRemove('children');
    } else if ( value == 'insert' ) {
        this.insertParametersContainer();
        this.renderParams(super.getParameterNames(this.myState.currentlySelectedScriptIndex));
        this.matchParamsTo(this.placeholders);
    }
    this.checkActiveOn(this.myState.currentlySelectedScript);
  }

  checkActiveOn (script) {
    const item = script
    if ( item.classList.contains('listed-item' )){
        if ( item.classList.contains('active' )){
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


  setNull (element) {
    if ( element ){
      if ( element.id == 'plxOutput' ){
        element.removeAttribute('href');
      }
      super.setFullUrlTo(this.emptyString);
      element = null;
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

  generateUrlBuild() {
    const script = super.getCurrentlySelectedScript();
    const scriptId = `${script.id}?p=`;
    super.setScriptIdTo(scriptId);
    const paramInputs = Object.entries(script.parameters);
    paramInputs.forEach(( [key, value], index ) => {
          let fieldInput = document.getElementById(`${key}`);
          if ( fieldInput.value ){ 
            console.log('Active field input: ')
            console.log(fieldInput);    
            this.paramBuild();
          }
    });
  }

  paramBuild () {
    const parameterEntries =  Object.entries(super.getScriptParameterValues());
    let paramBuild = '';
    console.log('Object representation of parameter values: ');
    parameterEntries.forEach(( [key, value], index ) => {
          console.log(key,': ', value);
          paramBuild += `${key}` + ':' +`${value}`;
            if ( index !== parameterEntries.length - 1 ) {
              paramBuild += ',';
            }
    });
    console.log('String representation of parameter values: ');
    console.log(paramBuild);
    super.setScriptParamsTo(paramBuild);
    let URL  = super.getBasePlxUrl();
    URL += super.getScriptId();
    URL += super.getParameterInputs();
    super.setFullUrlTo(URL);
    this.renderPlxUrl();
  } 

  renderPlxUrl() {
    this.createLinkElement();      
    console.log('new state: ')
    console.log(this.myState);
    this.plxOutputLink.href = super.getFullUrl();  
    this.plxOutputLink.classList.add('showLink');  
  }

  createLinkElement() {
    if ( !this.plxOutputLink ){
      this.plxOutputLink = document.createElement('a');
      this.plxOutputLink.id = 'plxOutput';
      this.plxOutputLink.target = '_blank';
      this.plxOutputLink.textContent = 'Head there now!';
      this.scriptButtonContainer.insertBefore(
            this.plxOutputLink,
            this.scriptButtonContainer.childNodes[2]); 
     
    } else {
      this.plxOutputLink.classList.toggle('showLink'); 
    }
  }
}
