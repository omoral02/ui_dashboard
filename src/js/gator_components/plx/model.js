export default class ScriptsModel {
  constructor() {
    this.initialState = {};
    this.workingState = this.initialState;
    this.myState = {};
  }

  setInitialStateObject() {
    let state = {
      statebasePlxUrl: 'http://plx/scripts2/',
      id: '',
      params: '',
      parameters: {},
      url: null,
      currentlySelectedScript: '',
      currentlySelectedScriptIndex: '',
    };
    this.initialState = state;
    this.setInitialState(this.initialState);
  }

  setInitialState (initialState) {
    this.workingState = initialState;
  }

  setMyStateToInitialWorkingState () {
    this.myState = this.workingState;
  }

  setNewState (param1, param2) {
    this.workingState = {};
    let state = {
      basePlxUrl: 'http://plx/scripts2/',
      id: '',
      params: '',
      parameters: {},
      url: null,
      currentlySelectedScript: param1,
      currentlySelectedScriptIndex: param2,
    }
    this.workingState = state;
    this.setMyStateToWorkingState(this.workingState);
  }

  setMyStateToWorkingState(workingState) {
    this.myState = workingState;
  }

  setScriptIdTo (id) {
    this.myState.id = id;
  }

  setScriptParamsTo (params) {
    this.myState.params = params;
  }

  setFullUrlTo (_this) {
    this.myState.url = _this;
  }

  setParameterValue (parameterName, parameterValue) {
    this.myState.parameters[parameterName] = parameterValue;
  }

  getScriptsParentHTML() {
    this.scriptsParentHtml =
      `<ul id='scriptList' rel='plxScriptWindow' class=''>
          <h2 class='card-header'>Scripts</h2>
          <div id='scriptButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close' title='Close this PLX Window.'></button>
              <button type='button' id='reset' class='exitbtn' title='Close parameters pane.'></button>
            </div>   
          <div class='card-inner' id='plx-InnerCard'>       
          </div>
          
       </ul>`;
    return this.scriptsParentHtml;
  }

  getParametersParentHTML() {
    this.parametersParentHTML = 
      `<div id='card-inner' class='card-inner'>
          <h2 class='card-header'>Parameters</h2>
          <div id='parameters'></div>
      </div>`;  
    return this.parametersParentHTML;
  }
  
  getParameterHTML (parameter) {
    let paramaterHtml = 
    `<div class='innerParam'>
          <p class='parameter'>
              <label for='${parameter}'>${parameter}:</label>
          </p>
          <p>
            <input type='text' class='input' id='${parameter}' placeholder=''>
          </p>
      </div>`;
    return paramaterHtml;
    
  } 

  getScripts() {
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
            'client_id': '',
            },
          },
          {
            title: ' QPS breakdown from Web-Service ',
            id: 'script_5b._a16102_0000_254d_940f_089e0822b400',
            parameters: {
              'table_column': '',
              'project_number': '',
              'date_from': '',
              'date_to': '',
            },
          },
          {
            title: ' Daily client and web service requests project and API key',
            id: 'script_5a._f21dfd_0000_2487_9d9b_001a114d8db4',
            parameters: {
              'project_id': '',
              'date_from': '',
              'date_to': '',
            }, 
          },
    ];
    return this.scripts;
  }

  getScript (index) {
    return this.scripts[index];
  }

  getCurrentlySelectedScript() {
    console.log(this.myState.currentlySelectedScriptIndex);
    return this.scripts[this.getCurrentlySelectedScriptIndex()];
  }

  getCurrentlySelectedScriptIndex() {
    return this.myState.currentlySelectedScriptIndex;
  }

  getStateCurrentlySelectedScript () {
    return this.myState.currentlySelectedScript;
  }

  getStateCurrentlySelectedScriptIndex () {
    return this.myState.currentlySelectedScriptIndex;
  }

  getNewWorkingState (index, script) {
    let workingState = this.setNewState(script, index);
    return workingState;
  }

  getParameterNames (scriptIndex) {
    return Object.keys(this.scripts[scriptIndex].parameters);
  }

  getParameterInputs () {
    return this.myState.params;
  }

  getBasePlxUrl() {
    return this.myState.basePlxUrl;
  }

  getScriptId() {
    return this.myState.id;
  }

  getScriptParameterValues() {
    return this.myState.parameters;
  }

  getFullUrl() {
    return this.myState.url;
  }
}
