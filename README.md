#                                        Welcome to Project Gator


<dl><dt>  Description: Project Gator is meant to help aggregate troubleshooting worflow modules meant to aide front-line agents in their troubleshooting processes by providing:</dt>

<dd> Simple way to generate URL queries (PLX/Dremel Scripts) for internal tool querying by saving case data in only place and making that data usable without the hassle of copying and pasting information from one tool to the other. (PLX COMPLETE/ Dremel WIP) </dd>
    <dd> Allow agents to use a team GCP project for Google Maps APIs testing with retrievable troubleshooting sessions. (WIP)</dd>
    <dd> Allow you to test a customer's project API responses with retrievable troubleshooting sessions. (WIP) </dd>
    <dd> Allow agents to customize and test dynamic and static map rendering on different JS lib versions and browsers through storeable sessions. (WIP)</dd>
    <dd> Give agents a centralized dashboard to review or acknowledge new and existing KB changes found in changelogs. (WIP)</dd>
    <dd> Allow TSEs or TLs to broadcast announcements in one place with retreivable announcement logs. (WIP)</dd>
</dl>

***

>`./dist/`:  Production server-side Gator w/ Express. Client-side resources are found in `./dist/public/`.


        __Start production script from './dist/':__ `npm run start` 

>`./src/`: Development source files(active builds in development) and vendor modules/plugins. 
 
 
        Build script(set webpack's config `watch:` property to either boolean > `false || true`): 
        
        __Start build script from root DIR:__ `npm run webpack`.

        Dev script with `watch:` set to true in development mode. 
  
        
        __Start development script from project's root DIR:__ `npm run dev:server`.
 
        *Proceed to monitor dev changes on `http://localhost:8080`*


***

NOTE: Changing the `const dev_mode` comparative operator using `process.env.NODE_ENV (!== || ==) production` boolean result will toggle ternary operator `config.mode: dev_mode ? ’development’ : ‘production’` mode and output is logged on compile.  


## MVC Modules in development listed below:



`./src/js/chat/`

controller.js

model.js

view.js


`./src/js/gator_components/dynamic_map_modules/map/dynamic/`

controller.js

initialize_dynamic_map.js

view.js

model.js


`./src/js/gator_components/dremel`

controller.js

view.js

model.js


`./src/js/gator_components/todo`

controller.js

view.js

model.js