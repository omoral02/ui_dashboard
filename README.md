#                                        Welcome to project Gator


## Description: 

Project Gator is meant to help aggregate troubleshooting-workflow modules meant to aide front-line agents in their troubleshooting processes by providing TSEs, TLs, and agents a tool to:

* generate URL queries (PLX/Dremel Scripts) for internal tool querying by saving case data in only one place. This makes that data re-usable without the hassle of copying and pasting information from one tool to the other, reducing the chances that an error or mistake will occur. 
    - PLX: COMPLETE
    - Dremel: (Part of DuperTool now)

* test Google Maps APIs with a team GCP project with retrievable troubleshooting sessions.
(WIP)

* test Google Maps APIs on a customer's project with retrievable troubleshooting sessions.
(WIP)

* customize and test dynamic maps on different lib versions and browsers through storeable and retreivable client-side request logs/screenshots/sessions.
(WIP)

* customize and test static map/street-view rendering on different browsers, config options, and implementation styles through storeable and retreivable request logs/screenshots/sessions.
(WIP)

* centralize a source-of-truth dashboard that agents can use in order to review or acknowledge new and existing KB changes found in changelogs.
(WIP)

* broadcast changes and API issues in one place with retreivable announcement/ack logs.
(WIP)


***

### _Build script:_

Start build script from root DIR `./`: 

`npm run webpack`

Production Server-side source files are found in `./dist/`.

Production Client-side source files are found in `./dist/public`.

### _Dev script:_ 
    
Set Webpack's config `config.watch:` property to either boolean: `false || true`.

Dev script `config.watch:` property in Webpack's config file is set to true when running `npm run dev:server` script. 

Start development script from project's root DIR `./`:

`npm run dev:server`

Proceed to monitor dev changes on `http://localhost:8080`.

### _Production  script:_

Manually start production script from `./dist/`: 

`npm run start`

Inspect live production files on `http://localhost:3000`.

***

## _NOTE:_ 

_There are two ways to change Webpack's environment from `development` to `production` mode._ 

1. Changing the comperative operator using `const dev_mode = process.env.NODE_ENV (!== || ==) production` boolean result will toggle the ternary operator found in the property to `config.mode: dev_mode ? 'development' : 'production'`. Mode and output is logged on compile.  

OR

2. You can remove or change the `NODE_ENV=` environment variable argument used in the package.json script declarations so that Webpack defaults to initial config:

        "scripts": {
            "dev:server": "./warning.sh && NODE_ENV=development ./node_modules/.bin/webpack-dev-server",
            "webpack": "rm ./dist/public/ -rf | NODE_ENV=production webpack --progress"
        } 

***

#### _MVC modules in development listed below:_


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