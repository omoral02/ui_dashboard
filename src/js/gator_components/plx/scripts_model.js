export default class ScriptsModel {
  constructor() {
    this.initialState = {};
    this.newState = this.initialState;
    this.myState = {};
    this.URL;
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
    this.scripts = [{
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
        parameters: {
          'project_id': '',
          'start_date': '',
          'end_date': ''
        }
      }
    ];
  }

  setInitialState(state) {
    this.newState = state;
  }

  setInitialStateObject() {
    let state = {
      statebasePlxUrl: 'http://plx/scripts2/',
      id: '',
      params: '',
      currentlySelectedScript: '',
      currentlySelectedScriptIndex: '',
    };
    this.initialState = state;
    this.setInitialState(this.initialState);
  }

  setNewState(param1, param2) {
    let state = {
      basePlxUrl: 'http://plx/scripts2/',
      id: '',
      params: '',
      currentlySelectedScript: param1,
      currentlySelectedScriptIndex: param2,
    }
    this.newState = state;
    console.log(this.newState);
    return this.newState;
  }

  getNewState(index, script) {
    let myState = this.setNewState(script, index);
    return myState;
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

  getCurrentSelectedScript(scriptIndex) {
    console.log(this.scripts[scriptsIndex]);
    return this.scripts[scriptIndex];
  }

  getCurrentlySelectedScriptIndex() {
    return this.myState.currentlySelectedScriptIndex;
    // console.log(this.currentlySelectedScriptIndex);
    // return this.currentlySelectedScriptIndex;
  }

  getParameterNames(scriptIndex) {
    return Object.keys(this.scripts[scriptIndex].parameters);
  }

  setParameterValue(scriptIndex, parameterName, parameterValue) {
    this.scripts[scriptIndex].parameters[parameterName] = parameterValue;
  }

  getBasePlxUrl() {
    return this.myState.basePlxUrl;
  }

  setScriptIdTo(id) {
    this.myState.url_add_on = id;
  }

  getScriptId() {
    return this.myState.url_add_on;
  }

  setScriptParametersTo(params) {
    this.myState.params = params;
  }

  getScriptParameters() {
    return this.myState.params;
  }

  setFullUrlTo(_this) {
    this.URL = _this;
  }

  getFullUrl() {
    return this.URL;
  }
}