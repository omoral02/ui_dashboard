export default class ScriptsModel {
  constructor() {
    this.initialState = {};
    this.workingState = this.initialState;
    this.myState = {};
  }

  /**
   * Reduce lines of code with something like this:
   *
    Foo() {
      let _acctNum = '';

      return {
          getAcctNum: function() {
              return _acctNum;
          },
          setAcctNum: function (newAcctNum) {
            _acctNum = newAcctNum;
          },
        }
      }
   *
   */

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
    this.setInitialStateObject();
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
    };
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

  setFullUrlTo (url) {
    this.myState.url = url;
  }

  setParameterValue (parameterName, parameterValue) {
    this.myState.parameters[parameterName] = parameterValue;
  }

  getScriptsParentHTML() {
       this.scriptsParentHtml =
       `<div id='scriptList' rel='plxScriptWindow' class='component'>
          <h2 class='card-header'>PLX Scripts</h2>
          <ul id='scriptButtonContainer' class='buttonContainer'>
              <button type='button' class='exitbtn' id='close_plx' title='Close this PLX Window.'></button>
              <button type='button' id='gen_plx' class='exitbtn' title='Generate URL for PLX with case info.'></button>
          </ul>
          <ul class='card-inner' id='plx-InnerCard' autofocus></ul>
        </div>`;
    return this.scriptsParentHtml;
  }

  getParametersParentHTML() {
    this.parametersParentHTML =
      `<div id='card-inner' class='card-inner'>
          <h2 class='card-header'>Parameters</h2>
          <div id='parameters'><form></form></div>
      </div>`;
    return this.parametersParentHTML;
  }

  getParameterHTML (parameter) {
    let paramaterHtml;
    if (parameter === 'date_from_YYYY_MM_DD' || parameter === 'date_to_YYYY_MM_DD'){
      if (parameter === 'date_from_YYYY_MM_DD'){
        paramaterHtml =
        `<div class='innerParam'>
              <p class='parameter'>
                  <label for='${parameter}'>Date From</label>
              </p>
              <p>
                <input type='text' size='20' maxlength='10' class='input' id='${parameter}' placeholder=''required>
              </p>
          </div>`;
      }
      else if (parameter === 'date_to_YYYY_MM_DD') {
        paramaterHtml =
        `<div class='innerParam'>
              <p class='parameter'>
                  <label for='${parameter}'>Date To</label>
              </p>
              <p>
                <input type='text' size='20' maxlength='10' class='input' id='${parameter}' placeholder='' required>
              </p>
          </div>`;
      }
    } else if (parameter === 'project_number') {
      paramaterHtml =
        `<div class='innerParam'>
              <p class='parameter'>
                  <label for='${parameter}'>Project</label>
              </p>
              <p>
                <input type='text' name='project' size='20' class='input' id='${parameter}' placeholder='' autofocus required>
              </p>
          </div>`;
    } else if (parameter === 'client_id') {
      paramaterHtml =
        `<div class='innerParam'>
              <p class='parameter'>
                  <label for='${parameter}'>ClientID (if applicable)</label>
              </p>
              <p>
                <input type='text' name='clientID' size='20' class='input' id='${parameter}' placeholder='' required>
              </p>
          </div>`;
    }
    return paramaterHtml;
  }

  getScripts() {
    this.scripts = [
      //  {
      //     title: 'API usage for specified mafe_weblog API by IP',
      //     id: 'script_5b._a15f62_0000_2cc9_bcc5_001a11404b34',
      //     parameters: {
      //       'case_number': '',
      //       'ip_range': '',
      //       'query_type': '',
      //       'api_endpoint_type': '',
      //       'table_suffix': '',
      //       'project_number': '',
      //       'client_id': '',
      //       },
      //     },
      //     {
      //       title: 'QPS breakdown from Web-Service',
      //       id: 'script_5b._a16102_0000_254d_940f_089e0822b400',
      //       parameters: {
      //         'table_column': '',
      //         'project_number': '',
      //         'date_from_YYYY_MM_DD': '',
      //         'date_to_YYYY_MM_DD': '',
      //       },
      //   },
          // {
          //   title: 'Daily client and web service requests project and API key',
          //   id: 'script_5b._4e734f_0000_2d6d_af2d_94eb2c05a52e',
          //   parameters: {
          //     'client_id': '',
          //     'project_number': '',
          //     'date_from_YYYY_MM_DD': '',
          //     'date_to_YYYY_MM_DD': '',
          //   },
          // },
          // {
          //   title: 'Daily client-side requests per Day & API key',
          //   id: 'script_5d._03c800_0000_2a6b_85d2_883d24f8e3d4',
          //   parameters: {
          //     'client_id': '',
          //     'project_number': '',
          //     // 'api_key': '',
          //     // 'domain': '',
          //     'date_from_YYYY_MM_DD': '',
          //     'date_to_YYYY_MM_DD': '',
          //   },
          // },
          {
            title: 'Daily requests by API key & Channel',
            id: 'script_5b._4e734f_0000_2d6d_af2d_94eb2c05a52e',
            parameters: {
              'project_number': '',
              'client_id': '',
              // 'api_key': '',
              // 'domain': '',
              'date_from_YYYY_MM_DD': '',
              'date_to_YYYY_MM_DD': '',
            },
          },
          // {
          //   title: 'Total client-side requests by Domain, API key & Days Used',
          //   id: 'script_5d._03c5d4_0000_2961_9985_24058873f66c',
          //   parameters: {
          //     'client_id': '',
          //     'project_number': '',
          //     // 'api_key': '',
          //     // 'domain': '',
          //     'date_from_YYYY_MM_DD': '',
          //     'date_to_YYYY_MM_DD': '',
          //   },
          // },
          {
            title: 'Total URL STATS(redacted ) by URL, Domain, Project & Days Used',
            id: 'script_5d._07f69f_0000_21a9_b028_f403043e7540',
            parameters: {
              'project_number': '',
              'client_id': '',
              // 'url': '',
              // 'api_key': '',
              // 'domain': '',
              'date_from_YYYY_MM_DD': '',
              'date_to_YYYY_MM_DD': '',
            },
          },
          {
            title: 'GeoStats Domain & Web-services w/ IP obfuscation',
            id: 'script_5d._5ef884_0000_2398_b5bf_089e082dbdd4',
            parameters:{
              'project_number': '',
              'client_id': '',
              // 'url': '',
              // 'api_key': '',
              // 'domain': '',
              'date_from_YYYY_MM_DD': '',
              'date_to_YYYY_MM_DD': '',

            },
          },
          {
            title: 'Historic Maps APIs: Daily client and web service requests',
            id: 'script_5d._7814be_0000_2f72_80a4_001a11405cb4',
            parameters: {
                    'project_number': '',
                    'client_id': '',
                    'date_from_YYYY_MM_DD': '',
                    'date_to_YYYY_MM_DD': '',
                  },
          },
          // {
          //   title: 'Places Autocomplete Sessions V2',
          //   id: 'maps_support_recent_places_autocomplete_sessions2',
          //   parameters: {
          //     'client_id': '',
          //     'project_number': '',
          //     'date_from_YYYY_MM_DD': '',
          //     'date_to_YYYY_MM_DD': '',
          //   },
          // },
          // {
          //   title: 'User-Agent script - provided by Seth S.',
          //   id: 'script_5d._5f020f_0000_2cfb_9763_001a11c0ea40 ',
          //   parameters: {
          //     'client_id': '',
          //     'project_number': '',
          //     'date_from_YYYY_MM_DD': '',
          //     'date_to_YYYY_MM_DD': '',
          //   },
          // },
    ];
    return this.scripts;
  }

  getScript (index) {
    return this.scripts[index];
  }

  getCurrentlySelectedScript() {
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
