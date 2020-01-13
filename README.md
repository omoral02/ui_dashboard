#                                        Welcome to Project Gator


## _Description_: 

Project Gator is meant to help aggregate troubleshooting worflow modules meant to aide front-line agents in their troubleshooting processes by providing:

* A Simple way to generate URL queries (PLX/Dremel Scripts) for internal tool querying by saving case data in only one place. This makes that data re-usable without the hassle of copying and pasting information from one tool to the other, reducing the chances that an error or mistake will happen. 
    - PLX: COMPLETE
    - Dremel: WIP 

* A team GCP project for Google Maps APIs testing with retrievable troubleshooting sessions. (WIP)

* A tool to test web-services responses on a customer's project with retrievable troubleshooting sessions. (WIP)

* Agents a tool to to customize and test dynamic and static map rendering on different JS lib versions 
and browsers through storeable sessions. (WIP)

* A centralized dashboard that agents can use in order to review 
or acknowledge new and existing KB changes found in changelogs. (WIP)

* TSEs,TLs, and Agents a tool to broadcast changes and issues in one place 
with retreivable announcement/ack logs. (WIP)


***

### _Build script:_

Start build script from root DIR: 

`npm run webpack`

Production Server-side source files are found in `./dist/`.

Production Client-side source files are found in `./dist/public`.

### _Dev script:_ 
    
Set Webpack's config `watch:` property to either boolean: `false || true`.

Dev script `watch:` property in Webpack's config file is set to true when running `npm run dev:server` script. 

Start development script from project's root DIR `./`:

`npm run dev:server`

Proceed to monitor dev changes on `http://localhost:8080`.

### _Production  script:_

Manually start production script from `./dist/`: 

`npm run start` 

Inspect live production files on `http://localhost:3000`

***

## _NOTE:_ 

_There are two ways to change Webpack's environment from `development` to `production` mode._ 

1. Changing the `const dev_mode` comperative operator using `process.env.NODE_ENV (!== || ==) production` boolean result will toggle the ternary operator found in the property `config.mode:` to `dev_mode ? development : production`. Mode and output is logged on compile.  

2. You can also remove or change the `NODE_ENV=` environment variable argument used in the package.json script declarations:
        "scripts": {

        "dev:server": "./warning.sh && NODE_ENV=development ./node_modules/.bin/webpack-dev-server --open --watch-poll",

        "webpack": "rm ./dist/public/ -rf | NODE_ENV=production webpack --progress"

        } 

#### _MVC Modules in development listed below:_


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