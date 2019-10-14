import ScriptsModel from './model';

export default class ScriptsView extends ScriptsModel {
  constructor (placeholders, viewPane) {
    super();
    this.placeholders = placeholders;
    this.parentPane = viewPane;
    this.emptyString = '';
  }

  initializeView() {
    this.checkForScriptsContainer();
  }

  checkForScriptsContainer () {
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
    } else {
          this.resetContainerFor('all');
    }
  }

  grabInnerComponent() {
    this.scriptsListContainer = document.getElementById('plx-InnerCard');
    this.scriptButtonContainer = document.getElementById('scriptButtonContainer');
    // this.reset = document.getElementById('reset');
    // this.reset.textContent = 'Reset';
    this.close = document.getElementById('close_plx');
    this.close.textContent = 'Close';
    this.generate = document.getElementById('gen_plx');
    this.generate.textContent = 'Go to PLX';
    this.insert(super.getScripts());
  }

  insert (scripts) {
    console.log('Plx scripts :: ', scripts);
    scripts.forEach( (script, index ) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li
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
    if ( level === 'all' ){
      this.resetChildren('children');
      if ( this.primaryParent ) {
        this.parentPane.removeChild(this.primaryParent);
      } 
      this.primaryParent = null;
    } else if ( level === 'children' ) {
      this.resetChildren('children');
    }
  }

  resetChildren(level) {
    if ( level === 'children' ){
      if ( super.getCurrentlySelectedScript === Element ){
        this.removeActive(super.getCurrentlySelectedScript);
      }
      if ( this.params ) {
           this.parametersInnerContainer.removeChild(this.params);
      }
      if ( this.secondaryParent ) {
           this.scriptsListContainer.removeChild(this.secondaryParent);
      }
    }
    this.params = null;
    this.secondaryParent = null;
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
    if ( item && item.classList.contains('listed-item' )){
        if ( item.classList.contains('active' )){
             this.removeActive(item);
        } else {
             this.resetListItems();
             item.classList.add('active');
        }
    }
  }

  hideInactive(){
    let items = document.getElementsByClassName('listed-item');
    for(let i=0; i < items.length; i++){
      let item = items[i];
      if( !item.classList.contains('active')){
        item.classList.toggle('inactive');
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
      if ( item.classList.contains('inactive')){
           this.removeInactive(item);
      }
    }
  }

  removeActive (onListedItem) {
    const item = onListedItem;
    item.classList.remove('active');
  }

  removeInactive (onListedItem) {
    const item = onListedItem;
    item.classList.remove('inactive');
  }

  renderParams (parameters) {
    if ( !this.params ){
        this.params = document.createElement('div');
        this.params.id = 'params';
    }
    this.parametersHtml = '';
    parameters.forEach( (parameter) => {
      this.parametersHtml += super.getParameterHTML(parameter);
    });
    this.params.innerHTML = this.parametersHtml;
    this.parametersInnerContainer.insertBefore(this.params, this.parametersInnerContainer.childNodes[0]);
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

  isValid (input, status) {
    let field = input;
    console.log('Is ', field.id, 'valid? ', status, ' === ', field.value);
    if( field && field.classList.contains('valid')){
      console.log('Input is already marked as valid...');
      } else if ( field && field.classList.contains('invalid')){
          console.log('Input is now valid!');
          field.classList.toggle('invalid');
          field.classList.toggle('valid');
      } else if ( field && !field.classList.toggle('valid')) {
          console.log('Input has been initially marked as valid, great!');
          field.classList.toggle('valid');
      }
  }

  isInvalid (input, status) {
    let field = input;
    console.log('Is ', field.id, 'valid? ', status, ' ===', field.value);
    if( field && field.classList.contains('invalid')){
        console.log('Input is already marked as invalid...');
    } else if ( field && field.classList.contains('valid')){
        console.log('Input is no longer valid!');
        field.classList.toggle('valid');
        field.classList.toggle('invalid');
    } else if ( field && !field.classList.toggle('invalid')) {
        console.log('Input has been initially marked as invalid...');
        field.classList.toggle('invalid');
    }
  }
}

