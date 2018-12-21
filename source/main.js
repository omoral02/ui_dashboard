'use strict';

/**
 *
 * This is a place-holders model which returns an array with key/value object
 * entries that are generic field HTML `placeholder` attribute values not
 * specific to modules; rather specific to field-input formats. This helps the
 * app_controller replace the listed-item's `placeholder` HTML attribute with
 * what's found in this model matching the `id` HTML attribute value to the
 * value found in this generic placeholders_model class.
 *
 * @class PlaceholdersModel
 *
 * @example - field input format:
 *   'client_id': 'gme-XXXXX'
 *
 * @function getParameterValues() {
 *    return Object.valueOf(this.placeholders[0].parameters);
 *  }
 * @function getParameterKeys() {
 *    return Object.keys(this.placeholders[0].parameters);
 *  }
 *
 */
class PlaceholdersModel {
  /**
   *
   *@constructor - Create the key-value object(s) array for parameter input
   *               `placeholder` attribute value formats.
   *
   */
  constructor() {
    this.placeholders = [{
      parameters: {
        'case_number': 'Unify case number',
        'ip_range': '10.0.0.0/32 1234:5678::/48',
        'query_type': 'GEOCODING_API_QUERY / PLACE_API_DETAILS_QUERY',
        'api_endpoint_type': 'ENDPOINT_JAVASCRIPT_API / ENDPOINT_WEB_SERVICE',
        'table_suffix': '20180503, last3days, latest, all',
        'project_number': '1234567891012',
        'client_id': 'gme-XXXXX',
        'project_id': 'my-project1234343',
        'start_date': 'YYYY-MM-DD',
        'end_date': 'YYYY-MM-DD',
        'key': 'AIzaSy***********',
        'table_column': 'QPS column in logs.web_service_qps.all- "places"'
      }
    }];
  }

  /**
   *
   * @function
   * @return {array} - The whole array of objects.
   *
   */
  getFieldSamples() {
    return this.placeholders;
  }

  /**
   *
   * @function
   * @return {object} - Return first object entry for
   * `this.placeholders[]` array of objects
   *
   */
  getParametersList() {
    return this.placeholders[0];
  }

  /**
   *
   *
   */
  getParameterValues() {
    return Object.valueOf(this.placeholders[0].parameters);
  }

  /**
   *
   *
   */
  getParameterKeys() {
    return Object.keys(this.placeholders[0].parameters);
  }
}

/**
 *
 * PLX Scripts model which returns objects with HTML templates
 * to be implemented with the ScriptsView module/class.
 *
 * @param {class object} pModel - PlaceHoldersModel for generic input formats.
 */
class ScriptsModel {
  /**
   *
   *
   */
  constructor(pModel) {
    this.observers = [], this.placeholdersModel = pModel,
    this.currentlySelectedScriptIndex = null,
    this.basePlxUrl = 'http://plx/scripts2/',
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
          </div>`,
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

  /**
   *
   *
   */
  registerObserver(observer) {
    this.observers.push(observer);
  }

  /**
   *
   *
   */
  notifyAll() {
    this.observers.forEach(function observerUpdate(observer) {
      console.log(
          'This scripts observer will update the href with: ' +
          observer.scriptsModel.URL);
      observer.update(this);
      console.log(observer.scriptsModel.URL);
    });
  }

  /**
   *
   *
   */
  getScriptsParentHTML() {
    return this.scriptsParentHtml;
  }

  /**
   *
   *
   */
  getScripts() {
    return this.scripts;
  }

  /**
   *
   *
   */
  getScript(index) {
    return this.scripts[index];
  }

  /**
   *
   *
   */
  getCurrentSelectedScript() {
    return this.scripts[this.currentlySelectedScriptIndex];
  }

  /**
   *
   *
   */
  getCurrentlySelectedScriptIndex() {
    return this.currentlySelectedScriptIndex;
  }

  /**
   *
   *
   */
  getParameterNames(scriptIndex) {
    return Object.keys(this.scripts[scriptIndex].parameters);
  }

  /**
   *
   *
   */
  setParameterValue(scriptIndex, parameterName, parameterValue) {
    this.scripts[scriptIndex].parameters[parameterName] = parameterValue;
  }

  /**
   *
   *
   */
  getBasePlxUrl() {
    return this.basePlxUrl;
  }
}

/**
 *
 *
 */
class ScriptsController {
  /**
   *
   *
   */
  constructor(sModel) {
    this.scriptsModel = sModel;
    this.placeholdersModel = this.scriptsModel.placeholdersModel;
  }

  /**
   *
   *
   */
  registerObserver(observer) {
    this.scriptsModel.registerObserver(observer);
  }

  /**
   *
   *
   */
  onScriptClick(e) {
    const currentlySelectedScript = this.scriptsModel.currentlySelectedScript =
        e.target;
    const scriptIndex = parseInt(currentlySelectedScript.dataset.index);
    if (currentlySelectedScript) {
      this.checkActive(currentlySelectedScript, scriptIndex);
      this.scriptsModel.notifyAll();
      // this.scriptsModel.notifyAll(); // this is equal to
      // this.scriptsModel.observers[0].update() //
    }
  }

  /**
   *
   *
   */
  scriptManager(scriptIndex) {
    this.scriptsModel.currentlySelectedScriptIndex = scriptIndex;
    this.scriptsModel.observers[0].renderParameters(
        this.scriptsModel.getParameterNames(scriptIndex));
    this.scriptsModel.observers[0].checkShow();
  }

  /**
   *
   *
   */
  onParameterInput(event) {
    const scriptIndex = this.scriptsModel.getCurrentlySelectedScriptIndex();
    const parameterName = event.target.id;
    const parameterValue = event.target.value;
    this.scriptsModel.setParameterValue(
        scriptIndex, parameterName, parameterValue);
    this.scriptsModel.observers[0].renderPlxUrl(
        this.scriptsController.generatePlxUrl());
  }

  /**
   *
   *
   */
  generatePlxUrl() {
    const script = this.scriptsModel.getCurrentSelectedScript();
    const params = Object.entries(script.parameters);
    this.scriptsModel.url_add_on =
        this.scriptsModel.basePlxUrl + `${script.id}?p=`;
    this.scriptsModel.URL = this.scriptsModel.url_add_on;
    this.scriptsModel.params = '';
    params.forEach(([key, value], index) => {
      this.scriptsModel.params += `${key}:${value}`;
      if (index !== params.length - 1) {
        this.scriptsModel.params += ',';
      }
    });
    this.scriptsModel.URL += this.scriptsModel.params;
  }
}

/**
 *
 *
 */
class ScriptsView {
  constructor(sController) {
    this.scriptsController = sController;
    this.scriptsModel = this.scriptsController.scriptsModel;
    this.placeholdersModel = this.scriptsController.placeholdersModel;
    this.mainMenu = document.getElementsByTagName('main');
    this.popWindowOne = document.createElement(`section`);
    this.popWindowOne.id = 'popUp';
    this.mainMenu[0].insertAdjacentElement('afterend', this.popWindowOne);
    this.toggleButton = document.getElementById('plx-button');
    this.scriptsParent = document.createElement('div');
    this.scriptsParent.classList.add('card');
    this.scriptsParent.id = 'scriptsContainer';
    this.scriptsParentinnerHTML = (() => {
      return this.scriptsModel.getScriptsParentHTML();
    })();
    this.scriptsParent.innerHTML = this.scriptsParentinnerHTML;
    this.popWindowOne.insertBefore(
        this.scriptsParent, this.popWindowOne.childNodes[0]);
    this.scriptList = document.getElementById('scriptList');
    this.ListInnerContainer = document.getElementById('plx-InnerCard');
    this.parametersContainer = document.getElementById('parametersContainer');
    this.parametersInnerContainer = document.getElementById('parameters');
    this.currentlySelectedScript = null;
    this.linkLister = document.createElement('div');
    this.plxOutputButton = document.createElement('a');
    this.init();
    this.scriptsController.registerObserver(this);
  }

  init() {
    this.pullScripts(this.scriptsModel.getScripts());
    this.toggleButton.addEventListener(
        'click', this.plxButtonToggle.bind(this));
    this.ListInnerContainer.addEventListener(
        'click', this.scriptsController.onScriptClick.bind(this));
    this.parametersInnerContainer.addEventListener(
        'input', this.scriptsController.onParameterInput.bind(this));
  }

  toggleParamContainer() {
    if (this.parametersContainer) {
      this.parametersContainer.classList.toggle('show');
    }
  }

  checkShow() {
    let parametersParent = this.parametersContainer;
    if (!parametersParent.classList.contains('show')) {
      parametersParent.classList.toggle('show');
    } else {
      this.resetItems();
    }
  }

  pullScripts(scripts) {
    // scripts need to be more specific by accessing the DOM element traversing
    // the `rel` attribute for each class element that contains the attribute
    // `rel=plxScriptWindow` would then be more DOM MVC specific. then append
    // child to more specified DOM element

    scripts.forEach((script, index) => {
      const li = document.createElement('li');
      li.textContent = script.title;
      li.classList.add('listed-item');
      li.dataset.index = index;
      this.ListInnerContainer.appendChild(li);
    });
  }

  plxButtonToggle() {
    this.scriptsParent.classList.toggle('show');
    this.resetItems();
  }

  checkActive(currentlySelectedScript, scriptIndex) {
    let item = currentlySelectedScript;
    if (item.classList.contains('listed-item')) {
      if (item.classList.contains('active')) {
        this.removeActive();
        this.scriptsController.scriptManager(scriptIndex);
      } else {
        this.removeActive();
        item.classList.toggle('active');
        this.scriptsController.scriptManager(scriptIndex);
        this.matchParams(this.placeholdersModel.getFieldSamples());
      }
    }
  }

  renderParameters(parameters) {
    let parametersHtml = '';
    parameters.forEach((parameter) => {
      parametersHtml += `<div class="innerParam"><p class="parameter">
              <label for="${parameter}">${parameter}:</label></p>
              <p><input type="text" class="input" id="${
          parameter}" placeholder="">
              </p></div>`;
    });
    this.parametersInnerContainer.innerHTML = parametersHtml;
    let linkListerHtml = '';
    linkListerHtml += `<div id="linkLister"></div>`;
    this.linkLister.innerHTML = linkListerHtml;
    this.parametersInnerContainer.appendChild(this.linkLister);
  }

  matchParams(placeholders) {
    let parameterExample = null;
    let fieldSamples = Object.entries(placeholders[0].parameters);
    fieldSamples.forEach(([key, value], index) => {
      parameterExample = document.getElementById(`${key}`);
      if (parameterExample) {
        parameterExample.setAttribute('placeholder', `${value}`);
      }
    });
  }

  renderPlxUrl() {
    this.plxOutputButton.href = null;
    this.plxOutputButton.target = '_blank';
    this.plxOutputButton.id = 'plxOutput';
    this.plxOutputButton.href = this.scriptsModel.URL;
    this.plxOutputButton.textContent = 'Head there now!';
    this.plxOutputButton.classList.add('showLink');
    this.linkLister.appendChild(this.plxOutputButton);
    console.log(this.plxOutputButton.href);
  }

  removeActive() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      item.classList.remove('active');
      this.resetLink();
    }
  }

  resetItems() {
    let items = document.getElementsByClassName('listed-item');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    }
    this.parametersContainer.classList.remove('show');
    this.resetLink();
  }

  resetLink() {
    this.plxOutputButton.classList.remove('showLink');
  }

  update() {
    this.scriptsModel.params = '';
    this.scriptsModel.url_add_on = '';
    this.scriptsModel.URL = null;
  }
}

/**
 *
 * Main arrow function instantiates our class
 * objects on `load` window event.
 *
 */
const main = (() => {
  const pModel = new PlaceholdersModel();
  const sModel = new ScriptsModel(pModel);
  const sController = new ScriptsController(sModel);
  const sView = new ScriptsView(sController);
});

window.addEventListener('load', main);