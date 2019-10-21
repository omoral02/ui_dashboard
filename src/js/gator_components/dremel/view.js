import DremelModel from './model';

export default class DremelView extends DremelModel{
    constructor (placeholders, viewPane) {
    super();
    this.placeholders = placeholders;
    this.parentPane = viewPane;
    this.emptyString = '';
  }

    initializeView(){
        if ( !this.primaryParent ) {
            this.primaryParent = document.createElement('div');
            this.primaryParent.id = 'dremelPrimaryContainer';
            this.primaryParent.classList.add('card');
            this.primaryParent.classList.add('component');
            this.primaryParentinnerHTML = ( () => {
                return super.getDremelParentHTML()
            })();
            this.primaryParent.innerHTML = this.primaryParentinnerHTML;
            this.parentPane.insertBefore(
            this.primaryParent,
            this.parentPane.childNodes[0]);
            this.grabInnerComponent();
            // insert static map primary container
        } else {
                this.resetPrimaryContainerFor('all');
                // remove scripts primary container if it exists.
        }
    }

    grabInnerComponent(){
      this.secondaryParent = document.createElement('div');
      this.secondaryParent.id = 'dremelSecondary';
      this.secondaryParentInnerHTML =( ()=>{
        return super.getDremelSecondaryHTML();
      })();
      this.secondaryParent.innerHTML= this.secondaryParentInnerHTML;
      this.primaryParent.appendChild(this.secondaryParent);
    }

    resetPrimaryContainerFor (level) {
        if ( level === 'all' ){
          this.resetChildren('children');
          if ( this.primaryParent ) {
            this.parentPane.removeChild(this.primaryParent);
          }
          this.primaryParent = null;
        } else if ( level === 'children' ) {
          this.resetChildren('children');
        } else if ( level === 'link' ) {
          this.resetChildren('link');
        }
      }
    resetChildren(level) {
        // if ( level == 'children' ){
        // if (  ){
        // }
        // if (  ){
        // }
        // if (  ) {
        // }
        // if (  ) {
        //
        // } else if (  ){
        //     if (  ){       
        //     }
        // }
    }

    setNull (element) {
        if ( element ){
        if ( element.id == '' ){
            element.removeAttribute('href');
        }
        super.setFullUrlTo(this.emptyString);
        element = null;
        }
    }
}
