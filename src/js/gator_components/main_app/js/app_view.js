export default class AppView {

      constructor (scripts_view, map_view) {
        this.panes = [];
        this.scripts_view = scripts_view;
        this.map_view = map_view;
        this.mainMenu = document.getElementsByTagName('main');
        this.popWindowOne = document.createElement('section');
        this.popWindowOne.id = 'popUp';
        this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);
        this.scripts_view.init();
        this.map_view.init();
      }

      listenForDomInsert () {
        document.addEventListener('webkitAnimationStar', this.checkAttachedPanes, false)
     }

      checkAttachedPanes (event) {
        if (event.animationName === 'nodeInserted') {
          console.log('Node has been inserted: ' + event.target);
            if (this.scripts_view.popWindow.childNodes[0]) {
              let childNodes = this.popWindow.childNodes.length;
              for (let i =0; i < childNodes; i++){
                this.child = childNodes[i];
                this.panes.push(this.child);
              } 
            this.setPaneOrder();
            }
        }
      }

      setPaneOrder () {
        this.panes.forEach(([index],pane) => {
          if(pane !== this.panes.length - 1){
             let index = `${pane.index}`; 
             pane.setAttribute('order', index);
           }
        });
      }
}