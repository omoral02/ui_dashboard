export default class ScriptsModel {
    constructor(placeholders_model) {
      this.observers = [];
      this.placeholders_model = placeholders_model;
      this.currentlySelectedScriptIndex = null;
      this.basePlxUrl = 'http://plx/scripts2/';
      this.currentlySelectedScript = null;
      this.scriptsParentHtml =
          `<ul id="scriptList" rel='plxScriptWindow' class=''>
                <h2 class="card-header">Scripts</h2>
                <div class="card-inner" id="plx-InnerCard"></div>
            </ul>
            <div class="card" id="parametersContainer">
                <div class="card-inner">
                  <h2 class="card-header">Parameters</h2>
                  <div id="parameters"></div>
                </div>
            </div>`;
      this.scripts = [
        {
          title: ' API usage for specified mafe_weblog API by IP ',
          id: 'script_5b._a15f62_0000_2cc9_bcc5_001a11404b34',
          parameters: {
            'case_number': '',
            'ip_range': '',
            'query_type': '',
            'api_endpoint_type': '',
            'table_suffix': '',
            'project_number': '',
            'client_id': ''
          }
        },
        {
          title: ' QPS breakdown from Web-Service ',
          id: 'script_5b._a16102_0000_254d_940f_089e0822b400',
          parameters: {
            'table_column': '',
            'project_number': '',
            'start_date': '',
            'end_date': ''
          }
        },
        {
          title: ' Daily client and web service requests project and API key',
          id: 'script_5a._f21dfd_0000_2487_9d9b_001a114d8db4',
          parameters: {'project_id': '', 'start_date': '', 'end_date': ''}
        }
      ];
      // let url_add_on;
      // Object.defineProperty(this, "url_add_on", {
      // get: () => { return url_add_on; },
      // set: (value) => {
      //     this.notifyAll();
      //   }
      // });
    }
    registerObserver(observer) {
      this.observers.push(observer);
    }
    notifyAll() {
      this.observers.forEach(function observerUpdate(observer) {
        console.log(
            'This scripts observer will update the href with: ' +
            observer.scripts_model.URL);
        observer.update(this);
        console.log(observer.scripts_model.URL);
      })
    }

    getScriptsParentHTML() {
      return this.scriptsParentHtml;
    }
    getScripts() {
      return this.scripts;
    }
    getScript(index) {
      return this.scripts[index];
    }
    getCurrentSelectedScript() {
      return this.scripts[this.currentlySelectedScriptIndex];
    }
    getCurrentlySelectedScriptIndex() {
      return this.currentlySelectedScriptIndex;
    }
    getParameterNames(scriptIndex) {
      return Object.keys(this.scripts[scriptIndex].parameters);
    }
    setParameterValue(scriptIndex, parameterName, parameterValue) {
      this.scripts[scriptIndex].parameters[parameterName] = parameterValue;
    }
    getBasePlxUrl() {
      return this.basePlxUrl;
    }
}
