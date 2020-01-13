>Welcome to Project Gator
>> Description: Project Gator is meant to help aggregate troubleshooting worflow modules meant to aide front-line agents in their troubleshooting processes by providing:

>>> Simple way to generate URL queries (PLX/Dremel Scripts) for internal tool querying by saving case data in only place and making that data usable without the hassle of copying and pasting information from one tool to the other. (PLX COMPLETE/ Dremel WIP)
>>> Allow agents to use a team GCP project for Google Maps APIs testing with retrievable troubleshooting sessions. (WIP)
>>> Allow you to test a customer's project API responses with retrievable troubleshooting sessions. (WIP)
>>> Allow agents to customize and test dynamic and static map rendering on different JS lib versions and browsers through storeable sessions. (WIP)
>>> Give agents a centralized dashboard to review or acknowledge new and existing KB changes found in changelogs. (WIP)
>>> Allow TSEs or TLs to broadcast announcements in one place with retreivable announcement logs. (WIP)

>`./dist/`:  Production server-side Gator w/ Express. Client-side resources are found in `./dist/public/`.
 >> Start production script from `./dist/`: `npm run start` 

>`./src/`: Development source files(active builds in development) and vendor modules/plugins. 
 >> Build script(set webpack config `watch:` property to either boolean > `false || true`): `npm run webpack`. 
 >> Dev script with `watch:` set to true in development mode. 
 >> Start development script from project's root DIR: `npm run dev:server`.
 >> Proceed to monitor changes on http://localhost:8080


NOTE: Changing the `const dev_mode` comparative operator using `process.env.NODE_ENV (!== || ==) production` boolean result will toggle ternary operator `config.mode: dev_mode ? ’development’ : ‘production’` mode and output is logged on compile.  


> MVC Modules in development listed below:



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