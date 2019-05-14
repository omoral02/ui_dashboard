

>`./dist/`:  Production server-side Gator w/ Express. Client-side resources are found in `./dist/public/`.
 >> Start script(from `./dist/`): `npm run start` 

>`./src/`: Development source files(active builds in development) and vendor modules/plugins. 
 >> Build script(set webpack config `watch:` property to either boolean > `false || true`): `npm run webpack`. Changing the dev_mode comparative operator boolean result will toggle `mode:` ternary operator for production or development mode and logged in output on compile.  


`./src/js/`

main.js 
 
util.js

`./src/js/chat/`

controller.js

model.js

view.js


`./src/js/gator_components/dynamic_map_modules/map/`

controller.js

view.js

model.js


`./src/js/gator_components/dynamic_map_modules/map/dynamic/`

controller.js

initialize_dynamic_map.js

view.js

model.js


`./src/js/gator_components/main_app/`

controller.js

view.js

model.js


`./src/js/gator_components/plx/`

controller.js

view.js

model.js
