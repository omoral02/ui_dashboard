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
          this.primaryParent.id = 'scriptsPrimaryContainer';
          this.primaryParent.classList.add('card');
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
    console.log('Scripts ::', scripts);
    scripts.forEach( (script, index ) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.scriptsListContainer.insertBefore(
        li,
        this.scriptsListContainer.childNodes[0]);
    })
    this.toggleScriptsContainer();
  }

  toggleScriptsContainer() {
    this.primaryParent.classList.add('show');
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
    this.secondaryParent.classList.add('show');
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

  // renderInputValidity (targetFieldInput, result) {
  //   let $target = targetFieldInput;
  //   let validation = result;
  //   if ( $target ) {
  //       if ( validation.valid == false && !$target.classList.contains('invalid') ){
  //           $target.classList.toggle('invalid');
  //       } else if ( validation.valid == true && $target.classList.contains('invlaid') ){    
  //           $target.classlist.remove('invalid');
  //       } 
  //   }
  // }

  renderPlxUrl() {
    if (this.plxOutputLink) {
      this.plxOutputLink.href = super.getFullUrl(); 
    } else {
      this.createLinkElement();     
      this.plxOutputLink.classList.add('showLink');
    }
    console.log('Object representation of parameter values:: ', this.myState); 
  }

  createLinkElement() {
    if ( !this.plxOutputLink ){
      this.plxOutputLink = document.createElement('a');
      this.plxOutputLink.id = 'plxOutput';
      this.plxOutputLink.target = '_blank';
      this.plxOutputLink.textContent = 'Head there now!';
      this.plxOutputLink.href = super.getFullUrl(); 
      this.scriptButtonContainer.insertBefore(
            this.plxOutputLink,
            this.scriptButtonContainer.childNodes[2]); 
     
      }
    }
}
