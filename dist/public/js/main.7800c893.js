(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[function(e,t){e.exports={cl_ApiKey:"AIzaSyAVUjC3CiwXLDElAq0AwWEntiVIfNadpW8"}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return ScriptsController}));var _view__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2);class ScriptsController extends _view__WEBPACK_IMPORTED_MODULE_0__.a{constructor(e,t,i,s){super(e,t,s),this.currentlySelectedItem,this.plxButton=i,this.validator=e,this.paramBuild,this.inputCount=[]}init(){super.setInitialStateObject(),super.initializeView(),this.scriptTitleParametersToggle()}scriptTitleParametersToggle(){super.setMyStateToInitialWorkingState(),this.scriptsListContainer.addEventListener("click",this.onScriptTitleClick.bind(this),!1),this.close.addEventListener("click",this.onScriptTitleClick.bind(this),!1)}onScriptTitleClick(e){if(this.currentlySelectedItem,this.currentlySelectedItem=e.target,this.currentlySelectedItem.classList.contains("listed-item")){super.insertParametersContainer();let e=parseInt(this.currentlySelectedItem.dataset.index);super.getNewWorkingState(e,this.currentlySelectedItem),this.checkShowOn(this.secondaryParent)}else"close_plx"===this.currentlySelectedItem.id&&(this.visualManager("all"),super.setMyStateToInitialWorkingState())}removeTitleListener(){this.scriptsListContainer.removeEventListener("click",this.onScriptTitleClick.bind(this),!1)}removePlxClickListener(){this.generate.removeEventListener("click",this.onPlxClick.bind(this),!1)}checkShowOn(e){e.classList.contains("show")?(this.removeTitleListener(),this.removePlxClickListener(),this.visualManager("remove"),super.removeActive(super.getStateCurrentlySelectedScript()),super.setMyStateToInitialWorkingState(),super.checkForScriptsContainer(),this.init()):(this.visualManager("insert"),super.hideInactive(),this.innerComponentIsNowListening())}visualManager(e){"remove"===e?(this.secondaryParentContainsShowRemove("children"),super.checkActiveOn(super.getStateCurrentlySelectedScript())):"all"===e?this.secondaryParentContainsShowRemove("all"):"insert"==e&&(super.insertParametersContainer(),super.renderParams(super.getParameterNames(super.getStateCurrentlySelectedScriptIndex())),super.matchParamsTo(this.placeholders),super.checkActiveOn(super.getStateCurrentlySelectedScript()))}secondaryParentContainsShowRemove(e){super.resetContainerFor(e)}innerComponentIsNowListening(){let e=document.getElementsByTagName("input");if(console.log(e),e)for(let t=0;t<e.length;t++){let i=e[t];i&&(i.addEventListener("input",this.onParameterInput.bind(this),!1),i.addEventListener("onkeydown",this.onParameterInput.bind(this),!1))}this.generate.addEventListener("click",this.onPlxClick.bind(this),!1)}onParameterInput(e){e.preventDefault();let t=e.target;this.inputDetectedOn(t)}onPlxClick(e){e.preventDefault(),this.removePlxClickListener(),this.inputCount=[];let t=document.getElementsByTagName("input");if(console.log(t),t){let e=[];for(let i=0;i<t.length;i++){let s=t[i];s.value.length>0&&(e.push(s),this.inputDetectedOn(s),console.log(s))}e.length>=3?this.buildClick():(console.log("We only have these entries: ",e),alert("Please ensure all fields have valid data!"))}}inputDetectedOn(e){let t=e;t.classList.contains("input")&&t.value&&this.validateInputOn(t)}validateInputOn(target){let inputField=target,id=inputField.id;console.log("Input to filter :: "+id);let filteredResult=eval("this.validator.is_"+id)(inputField);console.log("Does input match filter? :: ",filteredResult.matchesFilter),this.validateOutputOn(filteredResult)}validateOutputOn(e){let t=e,i=t.input,s=/[^\S+]/gi;console.log(t),i.value&&(console.log("Whitespace in input? :: ",s.test(i.value)),super.setParameterValue(i.id,i.value),!0===t.matchesFilter&&!1===s.test(i.value)?(Object.defineProperty(t,"valid",{value:!0,writable:!0}),this.inputCount.push(t),this.final(t)):(Object.defineProperty(t,"valid",{value:!1,writable:!0}),this.inputCount.push(t),this.final(t)))}final(e){let t=e,i=t.input,s=t.valid;return t&&1==s?(console.log("This",`${i.id}`,"meets the minimum requirements"),super.isValid(i,s),!0):!(!t||0!=s)&&(super.isInvalid(i,s),console.log("This does not meet the minimum requirements for a",`${i.id}`),!1)}buildClick(){this.generateScriptId(),this.paramBuild="",super.setScriptParamsTo(this.paramBuild);const e=Object.entries(super.getScriptParameterValues());console.log(e),e.length>=1&&(e.forEach(([t,i],s)=>{this.paramBuild+=`${t}`+":"+`${i}`,s!==e.length-1&&(this.paramBuild+=",")}),console.log("String representation of parameter inputs :: ",this.paramBuild,"\n"),this.setScriptLinkTo(this.paramBuild)),this.clickPlxUrl()}generateScriptId(){const e=`${super.getCurrentlySelectedScript().id}?p=`;super.setScriptIdTo(e)}setScriptLinkTo(e){super.setScriptParamsTo(e);let t=super.getBasePlxUrl();t+=super.getScriptId(),t+=super.getParameterInputs(),super.setFullUrlTo(t)}clickPlxUrl(){let e=super.getFullUrl();console.log(e,"\n"),console.log("Object representation of current state :: ",this.myState),function(e){window.open(e,"_blank").focus()}(e)}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));class s extends class{constructor(e){this.util=e,this.initialState={},this.workingState=this.initialState,this.myState={}}setInitialStateObject(){this.initialState={statebasePlxUrl:"http://plx/scripts2/",id:"",params:"",parameters:{},url:null,currentlySelectedScript:"",currentlySelectedScriptIndex:""},this.setInitialState(this.initialState)}setInitialState(e){this.workingState=e}setMyStateToInitialWorkingState(){this.setInitialStateObject(),this.myState=this.workingState}setNewState(e,t){this.workingState={};let i={basePlxUrl:"http://plx/scripts2/",id:"",params:"",parameters:{},url:null,currentlySelectedScript:e,currentlySelectedScriptIndex:t};this.workingState=i,this.setMyStateToWorkingState(this.workingState)}setMyStateToWorkingState(e){this.myState=e}setScriptIdTo(e){this.myState.id=e}setScriptParamsTo(e){this.myState.params=e}setFullUrlTo(e){this.myState.url=e}setParameterValue(e,t){this.myState.parameters[e]=t}getScriptsParentHTML(){return this.scriptsParentHtml="<div id='scriptList' rel='plxScriptWindow' class=''>\n          <h2 class='card-header'>PLX Scripts</h2>\n          <ul id='scriptButtonContainer' class='buttonContainer'>\n              <button type='button' class='exitbtn' id='close_plx' title='Close this PLX Window.'></button>\n              <button type='button' id='gen_plx' class='exitbtn' title='Generate URL for PLX with case info.'></button>\n          </ul>\n          <ul class='card-inner' id='plx-InnerCard'></ul>\n        </div>",this.scriptsParentHtml}getParametersParentHTML(){return this.parametersParentHTML="<div id='card-inner' class='card-inner'>\n          <h2 class='card-header'>Parameters</h2>\n          <div id='parameters'><form></form></div>\n      </div>",this.parametersParentHTML}getParameterHTML(e){let t;return"date_from_YYYY_MM_DD"===e||"date_to_YYYY_MM_DD"===e?"date_from_YYYY_MM_DD"===e?t=`<div class='parameter'>\n                <label for='${e}'>Date From:</label>\n                <input type='text' size='20' maxlength='10' class='input' id='${e}' placeholder=''required>\n        </div>`:"date_to_YYYY_MM_DD"===e&&(t=`<div class='parameter'>\n              <label for='${e}'>Date To:</label>\n              <input type='text' size='20' maxlength='10' class='input' id='${e}' placeholder='' required>\n        </div>`):"project_number"===e?t=`<div class='parameter'>\n              <label for='${e}'>Project:</label>\n              <input type='text' name='project' size='20' class='input' id='${e}' placeholder='' autofocus required>\n        </div>`:"client_id"===e&&(t=`<div class='parameter'>\n              <label for='${e}'>ClientID: (if applicable)</label>  \n              <input type='text' name='clientID' size='20' class='input' id='${e}' placeholder='' required>\n        </div>`),t}getScripts(){return this.scripts=[{title:"Daily requests by API key & Channel",id:"script_5b._4e734f_0000_2d6d_af2d_94eb2c05a52e",parameters:{project_number:"",client_id:"",date_from_YYYY_MM_DD:"",date_to_YYYY_MM_DD:""}},{title:"Total URL Stats(redacted ) by URL, Domain, Project & Days Used",id:"script_5d._07f69f_0000_21a9_b028_f403043e7540",parameters:{project_number:"",client_id:"",date_from_YYYY_MM_DD:"",date_to_YYYY_MM_DD:""}},{title:"GeoStats Domain & Web-services w/ IP obfuscation",id:"script_5d._5ef884_0000_2398_b5bf_089e082dbdd4",parameters:{project_number:"",client_id:"",date_from_YYYY_MM_DD:"",date_to_YYYY_MM_DD:""}},{title:"Historic Maps APIs: Daily client and web service requests",id:"script_5d._7814be_0000_2f72_80a4_001a11405cb4",parameters:{project_number:"",client_id:"",date_from_YYYY_MM_DD:"",date_to_YYYY_MM_DD:""}}],this.scripts}getScript(e){return this.scripts[e]}getCurrentlySelectedScript(){return this.scripts[this.getCurrentlySelectedScriptIndex()]}getCurrentlySelectedScriptIndex(){return this.myState.currentlySelectedScriptIndex}getStateCurrentlySelectedScript(){return this.myState.currentlySelectedScript}getStateCurrentlySelectedScriptIndex(){return this.myState.currentlySelectedScriptIndex}getNewWorkingState(e,t){return this.setNewState(t,e)}getParameterNames(e){return Object.keys(this.scripts[e].parameters)}getParameterInputs(){return this.myState.params}getBasePlxUrl(){return this.myState.basePlxUrl}getScriptId(){return this.myState.id}getScriptParameterValues(){return this.myState.parameters}getFullUrl(){return this.myState.url}}{constructor(e,t,i){super(e),this.utility=super.util,this.placeholders=t,this.parentPane=i,this.emptyString=""}initializeView(){this.checkForScriptsContainer()}checkForScriptsContainer(){this.primaryParent?this.resetContainerFor("all"):(this.primaryParent=document.createElement("div"),this.primaryParent.id="scriptsPrimaryContainer",this.primaryParent.classList.add("card"),this.primaryParent.classList.add("component"),this.primaryParentinnerHTML=(()=>super.getScriptsParentHTML())(),this.primaryParent.innerHTML=this.primaryParentinnerHTML,this.parentPane.insertBefore(this.primaryParent,this.parentPane.childNodes[0]),this.grabInnerComponent())}grabInnerComponent(){this.scriptsListContainer=document.getElementById("plx-InnerCard"),this.scriptButtonContainer=document.getElementById("scriptButtonContainer"),this.close=document.getElementById("close_plx"),this.close.textContent="Close",this.generate=document.getElementById("gen_plx"),this.generate.textContent="Go to PLX",this.insert(super.getScripts())}insert(e){console.log("Plx scripts :: ",e),e.forEach((e,t)=>{const i=document.createElement("li");i.textContent=e.title,i.classList.add("listed-item"),i.title="Click this title name to select the script or to reset your script selection.",i.dataset.index=t,this.scriptsListContainer.appendChild(i)}),this.toggleScriptsContainer()}toggleScriptsContainer(){this.primaryParent.classList.add("show")}resetContainerFor(e){"all"===e?(this.resetChildren("children"),this.primaryParent&&this.parentPane.removeChild(this.primaryParent),this.primaryParent=null):"children"===e&&this.resetChildren("children")}resetChildren(e){"children"===e&&(super.getCurrentlySelectedScript===Element&&this.removeActive(super.getCurrentlySelectedScript),this.params&&this.parametersInnerContainer.removeChild(this.params),this.secondaryParent&&this.scriptsListContainer.removeChild(this.secondaryParent)),this.params=null,this.secondaryParent=null}insertParametersContainer(){this.secondaryParent||(this.secondaryParent=document.createElement("div"),this.secondaryParent.classList.add("card"),this.secondaryParent.id="secondaryContainer",this.secondaryParentinnerHTML=(()=>super.getParametersParentHTML())(),this.secondaryParent.innerHTML=this.secondaryParentinnerHTML,this.scriptsListContainer.insertAdjacentElement("afterbegin",this.secondaryParent),this.grabSecondaryComponent())}grabSecondaryComponent(){this.cardInner=document.getElementById("card-inner"),this.parametersInnerContainer=document.getElementById("parameters")}toggleParamsContainer(){this.secondaryParent.classList.add("show")}checkActiveOn(e){const t=e;t&&t.classList.contains("listed-item")&&(t.classList.contains("active")?this.removeActive(t):(this.resetListItems(),t.classList.add("active"),t.focus()))}hideInactive(){let e=document.getElementsByClassName("listed-item");for(let t=0;t<e.length;t++){let i=e[t];i.classList.contains("active")||i.classList.toggle("inactive")}}resetListItems(){const e=document.getElementsByClassName("listed-item");for(let t=0;t<e.length;t++){const i=e[t];i.classList.contains("active")&&this.removeActive(i),i.classList.contains("inactive")&&this.removeInactive(i)}}removeActive(e){e.classList.remove("active")}removeInactive(e){e.classList.remove("inactive")}renderParams(e){this.params||(this.params=document.createElement("div"),this.params.id="params"),this.parametersHtml="",e.forEach(e=>{this.parametersHtml+=super.getParameterHTML(e)}),this.params.innerHTML=this.parametersHtml,this.parametersInnerContainer.insertBefore(this.params,this.parametersInnerContainer.childNodes[0]),this.secondaryParent.classList.toggle("show")}matchParamsTo(e){let t;Object.entries(e.parameters).forEach(([e,i],s)=>{t=document.getElementById(`${e}`),t&&t.setAttribute("placeholder",`${i}`)})}isValid(e,t){let i=e;console.log("Is ",i.id,"valid? ",t," === ",i.value),i&&i.classList.contains("valid")?console.log("Input is already marked as valid..."):i&&i.classList.contains("invalid")?(console.log("Input is now valid!"),i.classList.toggle("invalid"),i.classList.toggle("valid")):i&&!i.classList.toggle("valid")&&(console.log("Input has been initially marked as valid, great!"),i.classList.toggle("valid"))}isInvalid(e,t){let i=e;console.log("Is ",i.id,"valid? ",t," ===",i.value),i&&i.classList.contains("invalid")?console.log("Input is already marked as invalid..."):i&&i.classList.contains("valid")?(console.log("Input is no longer valid!"),i.classList.toggle("valid"),i.classList.toggle("invalid")):i&&!i.classList.toggle("invalid")&&(console.log("Input has been initially marked as invalid..."),i.classList.toggle("invalid"))}}},function(e,t,i){},function(e,t,i){},function(e,t,i){e.exports=i.p+"c373a2ace3191dfe7fd1dfd8a5b492e5.html"},function(e,t,i){"use strict";i.r(t);i(3),i(4);var s=i(0);var r=i(1);class n extends class extends class{constructor(){}getMapParentHTML(){return this.scriptsParentHtml="<div id='mapMain' rel='mapTester' class=''>\n          <h2 class='card-header'>Dynamic Map Testing</h2>\n          <ul id='mapButtonContainer' class='buttonContainer'>\n              <button type='button' class='exitbtn' id='close_static' title='Close this Map Window.'></button>\n              <button type='button' id='gen_map' class='exitbtn' title='Generate Map w/ options config.'></button>\n          </ul>\n          \n        </div>",this.scriptsParentHtml}getMapSecondaryHTML(){return this.secondaryHTML='<div id="mapInner" class="card-inner">\n          <ul class="card">\n          <p>JS API V3</p>\n          <p>\n              <label for="center">Center:</label>\n              <input id="center" size=\'40\' placeholder=" Austin, TX ">\n          </p>\n          <p>\n              <label for="zoom">Zoom:</label>\n              <input id="zoom" size=\'40\' maxlength=\'2\'placeholder=" 14 (Accepts 1-20)">\n          </p>\n          <p>\n              <label for="size">Size:</label>\n              <input id="size" size=\'40\' maxlength=\'9\' placeholder=" 400x400 || 2048x2048(PP) ">\n          </p>\n          <p>\n            <label for="scale">Scale:</label>\n            <input id="scale" size=\'40\' maxlength=\'2\' placeholder=" 2 || 4 (default is 1) ">\n          </p>\n          </ul>\n      </div>',this.secondaryHTML}}{constructor(e,t){super(),this.placeholders=e,this.parentPane=t,this.emptyString=""}initializeView(){this.primaryParent?this.resetPrimaryContainerFor("all"):(this.primaryParent=document.createElement("div"),this.primaryParent.id="mapPrimaryContainer",this.primaryParent.classList.add("card"),this.primaryParent.classList.add("component"),this.primaryParentinnerHTML=(()=>super.getMapParentHTML())(),this.primaryParent.innerHTML=this.primaryParentinnerHTML,this.parentPane.insertBefore(this.primaryParent,this.parentPane.childNodes[0]),this.grabInnerComponent())}grabInnerComponent(){this.secondaryParent=document.createElement("div"),this.secondaryParent.id="mapSecondary",this.secondaryParentInnerHTML=(()=>super.getMapSecondaryHTML())(),this.secondaryParent.innerHTML=this.secondaryParentInnerHTML,this.iframe=document.createElement("iframe"),this.iframe.id="testIframe",this.iframe.src=i(5),console.log(this.iframe.src),this.secondaryParent.appendChild(this.iframe),this.primaryParent.appendChild(this.secondaryParent)}resetPrimaryContainerFor(e){"all"===e?(this.resetChildren("children"),this.primaryParent&&this.parentPane.removeChild(this.primaryParent),this.primaryParent=null):"children"===e?this.resetChildren("children"):"link"===e&&this.resetChildren("link")}resetChildren(e){}setNull(e){e&&(""==e.id&&e.removeAttribute("href"),super.setFullUrlTo(this.emptyString),e=null)}}{constructor(e,t,i,s,r,n){super(t,s),this.mapButton=i,this.apikey=r,this.head=n,this.validator=e}init(){super.initializeView(),this.isNowListening()}isNowListening(){}}class a extends class extends class{constructor(){}getStaticMapParentHTML(){return this.scriptsParentHtml="<div id='staticMain' rel='staticTester' class=''>\n          <h2 class='card-header'>Static Map W/S Testing</h2>\n          <ul id='wsButtonContainer' class='buttonContainer'>\n              <button type='button' class='exitbtn' id='close_static' title='Close this Static Window.'></button>\n              <button type='button' id='gen_static' class='exitbtn' title='Generate URL for Static Map testing.'></button>\n          </ul>\n          <ul class='card-inner' id='static-InnerCard'></ul>\n        </div>",this.scriptsParentHtml}getStaticSecondaryHTML(){return this.secondaryHTML='<div id="staticInner" class="card component">\n          <p>https://maps.googleapis.com/maps/api/staticmap?</p>\n          <p>\n              <label for="center">Center:</label>\n              <input id="center" size=\'40\' placeholder=" Austin, TX ">\n          </p>\n          <p>\n              <label for="zoom">Zoom:</label>\n              <input id="zoom" size=\'40\' maxlength=\'2\'placeholder=" 14 (Accepts 1-20)">\n          </p>\n          <p>\n              <label for="size">Size:</label>\n              <input id="size" size=\'40\' maxlength=\'9\' placeholder=" 400x400 || 2048x2048(PP) ">\n          </p>\n          <p>\n            <label for="scale">Scale:</label>\n            <input id="scale" size=\'40\' maxlength=\'2\' placeholder=" 2 || 4 (default is 1) ">\n          </p>\n      </div>',this.secondaryHTML}}{constructor(e,t){super(),this.placeholders=e,this.parentPane=t,this.emptyString=""}initializeView(){this.primaryParent?this.resetPrimaryContainerFor("all"):(this.primaryParent=document.createElement("div"),this.primaryParent.id="staticMapPrimaryContainer",this.primaryParent.classList.add("card"),this.primaryParent.classList.add("component"),this.primaryParentinnerHTML=(()=>super.getStaticMapParentHTML())(),this.primaryParent.innerHTML=this.primaryParentinnerHTML,this.parentPane.insertBefore(this.primaryParent,this.parentPane.childNodes[0]),this.grabInnerComponent())}grabInnerComponent(){this.secondaryParent=document.createElement("div"),this.secondaryParent.id="staticSecondary",this.secondaryParentInnerHTML=(()=>super.getStaticSecondaryHTML())(),this.secondaryParent.innerHTML=this.secondaryParentInnerHTML,this.primaryParent.appendChild(this.secondaryParent)}resetPrimaryContainerFor(e){"all"===e?(this.resetChildren("children"),this.primaryParent&&this.parentPane.removeChild(this.primaryParent),this.primaryParent=null):"children"===e?this.resetChildren("children"):"link"===e&&this.resetChildren("link")}resetChildren(e){}setNull(e){e&&(""==e.id&&e.removeAttribute("href"),super.setFullUrlTo(this.emptyString),e=null)}}{constructor(e,t,i,s,r,n){super(t,s),this.staticButton=i,this.apikey=r,this.head=n,this.validator=e}init(){super.initializeView(),this.isNowListening()}isNowListening(){}}class l extends class extends class{constructor(){}getDremelParentHTML(){return this.scriptsParentHtml="<div id='dremelMain' rel='dremel' class=''>\n          <h2 class='card-header'>Dremel Scripts</h2>\n          <ul id='dremelButtonContainer' class='buttonContainer'>\n              <button type='button' class='exitbtn' id='close_dremel' title='Close this Dremel Window.'></button>\n              <button type='button' id='gen_dremel' class='exitbtn' title='Generate URL for Dremel query.'></button>\n          </ul>\n          <ul class='card-inner' id='dremel-InnerCard'></ul>\n        </div>",this.scriptsParentHtml}getDremelSecondaryHTML(){return this.secondaryHTML='<div id="dremelInner" class="card">\n          <p>\n              <label for="center">Center:</label>\n              <input id="center" size=\'40\' placeholder=" Austin, TX ">\n          </p>\n          <p>\n              <label for="zoom">Zoom:</label>\n              <input id="zoom" size=\'40\' maxlength=\'2\'placeholder=" 14 (Accepts 1-20)">\n          </p>\n          <p>\n              <label for="size">Size:</label>\n              <input id="size" size=\'40\' maxlength=\'9\' placeholder=" 400x400 || 2048x2048(PP) ">\n          </p>\n          <p>\n            <label for="scale">Scale:</label>\n            <input id="scale" size=\'40\' maxlength=\'2\' placeholder=" 2 || 4 (default is 1) ">\n          </p>\n      </div>',this.secondaryHTML}}{constructor(e,t){super(),this.placeholders=e,this.parentPane=t,this.emptyString=""}initializeView(){this.primaryParent?this.resetPrimaryContainerFor("all"):(this.primaryParent=document.createElement("div"),this.primaryParent.id="dremelPrimaryContainer",this.primaryParent.classList.add("card"),this.primaryParent.classList.add("component"),this.primaryParentinnerHTML=(()=>super.getDremelParentHTML())(),this.primaryParent.innerHTML=this.primaryParentinnerHTML,this.parentPane.insertBefore(this.primaryParent,this.parentPane.childNodes[0]),this.grabInnerComponent())}grabInnerComponent(){this.secondaryParent=document.createElement("div"),this.secondaryParent.id="dremelSecondary",this.secondaryParentInnerHTML=(()=>super.getDremelSecondaryHTML())(),this.secondaryParent.innerHTML=this.secondaryParentInnerHTML,this.primaryParent.appendChild(this.secondaryParent)}resetPrimaryContainerFor(e){"all"===e?(this.resetChildren("children"),this.primaryParent&&this.parentPane.removeChild(this.primaryParent),this.primaryParent=null):"children"===e?this.resetChildren("children"):"link"===e&&this.resetChildren("link")}resetChildren(e){}setNull(e){e&&(""==e.id&&e.removeAttribute("href"),super.setFullUrlTo(this.emptyString),e=null)}}{constructor(e,t,i,s,r,n){super(t,s),this.staticButton=i,this.apikey=r,this.head=n,this.validator=e}init(){super.initializeView(),this.isNowListening()}isNowListening(){}}class o extends class extends class{constructor(){this.placeholders=[{parameters:{case_number:"Unify case number",ip_range:"10.0.0.0/32 1234:5678::/48",query_type:"Geocoding_API_query/Place_API_details_query",api_endpoint_type:"Endpoint_Javascript_API/_Web_Service",table_suffix:"20180503, last3days, latest, all",project_number:"1234567891012",client_id:"gme-XXXXX",date_from_YYYY_MM_DD:"YYYY-MM-DD",date_to_YYYY_MM_DD:"YYYY-MM-DD",api_key:"AIzaSy***********",table_column:'QPS column in logs.web_service_qps.all- "places"',domain:"domain.com",url:"domain.com/path"}}],this.views={}}resetChildViews(){this.views.non_iretableViews=null,this.views.iterable_views=[]}getChildViews(){return this.views.iterable_views}setNewChildView(e){this.views.iterable_views.push(e)}getFieldSamples(){return this.placeholders}getParametersList(){return this.placeholders[0]}getParameterValues(){return Object.valueOf(this.placeholders[0].parameters)}getParameterKeys(){return Object.keys(this.placeholders[0].parameters)}}{constructor(){super(),this.head=document.getElementsByTagName("head")[0],this.viewsButtons=document.getElementsByClassName("dropbtn"),this.mainMenu=document.getElementById("main_menu"),this.menuBotton=document.getElementById("menu_title"),this.menuButtons=document.getElementById("menu_options"),this.plxButton=document.getElementById("plx_button"),this.plxButton.textContent="PLX Scripts",this.firstHalf=document.getElementById("firstHalf"),this.secondHalf=document.getElementById("secondHalf"),this.results=document.getElementById("results"),this.viewsPane=document.getElementById("views_pane"),this.secondHalf.insertBefore(this.viewsPane,this.secondHalf.childNodes[0]),this.viewportWidth,this.viewportHeight,this.minimumWindow}menuClicked(){this.menuButtons.classList.toggle("visible"),this.firstHalf.classList.toggle("visible"),this.actionButtons[0]&&this.actionButtons[0].focus()}menuItemClicked(){this.menuClicked()}checkAttachedPanes(){if(this.views.iterable_views!==[])this.viewsListHasChildNodes();else{super.resetChildViews();let e=this.viewsPane.childNodes;this.views.non_iterableViews=e,this.checkAndListChildNodes(this.views.non_iterableViews)}}viewsListHasChildNodes(){super.resetChildViews();let e=this.viewsPane.childNodes;this.checkAndListChildNodes(e),this.checkEachViewIndex()}checkAndListChildNodes(e){for(let t=0;t<e.length;t++){let i={view:e[t],count:t};super.setNewChildView(i)}}checkEachViewIndex(){this.views.iterable_views.length>0&&(console.table("Child componenets of the SPA :: ",this.views.iterable_views),this.views.iterable_views.forEach(this.setOrder))}setOrder(e,t,i){let s=e;s.view.style.order=`${t}`,s.count=[t]}resize(){this.viewportWidth=window.innerWidth||document.documentElement.clientWidth,this.viewportHeight=window.innerHeight||document.documentElement.clientHeight,this.minimumWindow=[700,520];let e=[this.viewportWidth,this.viewportHeight],t=[],i=2;for(;i-- >0;)t[i]=this.minimumWindow[i]>e[i]?this.minimumWindow[i]:e[i];console.log(`Ceiling:: W=${t[0]}, H=${t[1]}`),this.viewportWidth>640?console.log("Current width:: ",e[0],"Current Height:: ",e[1]):console.log("Width to restrict by:: ",e[0],"Height to restrict by:: ",e[1])}logView(){this.viewportWidth>640?console.log(`WIDE :: W=${this.viewportWidth}, H=${this.viewportHeight}`):console.log(`SMALL :: W=${this.viewportWidth}, H=${this.viewportHeight}`)}}{constructor(e,t){super(),this.util=new e,this.require=t,this.cl_apiKey=s.cl_ApiKey,this.actionButtons=[],this.onLoadCheckForActionButtons()}onLoadCheckForActionButtons(){for(let e=0;e<this.viewsButtons.length;e++){let t=this.viewsButtons[e];this.actionButtons.push(t)}this.loadControllers()}loadControllers(){this.instantiateControllersWith(this.util,super.getParametersList(),this.mapsButton,this.plxButton,this.staticMapButton,this.dremelButton,this.head,this.cl_apiKey,this.viewsPane)}instantiateControllersWith(e,t,i,s,o,c,d,h,p){this.scriptsController||(this.scriptsController=new r.a(e,t,s,p)),this.StaticWSController||(this.staticWSController=new a(e,t,o,p,h,d)),this.mapsController||(this.mapsController=new n(e,t,i,p,h,d)),this.dremelController||(this.dremelController=new l(e,t,c,p)),this.controllerIsNowlistening()}controllerIsNowlistening(){window.addEventListener("resize",this.windowEvent,!1),this.actionButtons.forEach(e=>{"menu_button"===e.id&&e.focus(),e.addEventListener("click",this.oneButtonWasClicked.bind(this),!0)})}windowEvent(){super.resize(),super.logView()}oneButtonWasClicked(e){e.preventDefault(),"plx_button"===e.target.id?(this.plxShouldLoad(),super.menuItemClicked()):"menu_button"===e.target.id?this.menuShouldRender():"maps_button"===e.target.id?(this.mapShouldLoad(),super.menuItemClicked()):"dremel_button"===e.target.id?(this.dremelShouldLoad(),super.menuItemClicked()):"static_map_button"===e.target.id&&(this.staticMapShouldLoad(),super.menuItemClicked()),super.checkAttachedPanes(),console.log("SPA App-level controller :: ",this)}menuShouldRender(){super.menuClicked()}plxShouldLoad(){this.scriptsController.init()}staticMapShouldLoad(){this.staticWSController.init()}mapShouldLoad(){this.mapsController.init()}dremelShouldLoad(){this.dremelController.init()}}t.default=new o(class extends class extends class{constructor(){}test(e,t,i){if(e.value||e.value&&e.value.search(filterRegEx)>-1)return e.value=e.value.replace(t,""),{matchesFilter:i.test(e.value),input:e}}}{constructor(){super()}is_client_id(e){console.log(e,"Input value:: ",e.value);let t=e;return super.test(t,/[^a-z-0-9]{1,25}/gi,/[a-z]{3}-[a-z0-9]{2,25}/gi)}is_case_number(e){console.log(e,"Input value:: ",e.value);let t=e;return super.test(t,/[^0-9]{1,8}/g,/[0-9]{6,8}/g)}is_project_number(e){console.log(e,"Input value:: ",e.value);let t=e;return super.test(t,/[^0-9]{1,12}/g,/[0-9]{8,12}/g)}is_date_from_YYYY_MM_DD(e){console.log(e,"Input value:: ",e.value);let t=e;return super.test(t,/[^-0-9]{1,10}/g,/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)}is_date_to_YYYY_MM_DD(e){console.log(e,"Input value:: ",e.value);let t=e;return super.test(t,/[^-0-9]{1,10}/g,/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)}}{constructor(){super()}clearConsole(){console.clear()}log(e){console.log(e)}})}],[[6,1]]]);