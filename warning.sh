#./usr/bin/env  

echo "                                                         ___________________                                                   "
echo "                                                         |                  |                                                  "                      
echo "                                                         |  !! WARNING !!   |                                                  "
echo "                                                         |__________________|                                                  

"   
echo "               This script will NOT compile to production standard on disk(only in memory) when files are saved while running.

"
echo "              !! What this means: dev:server script requires manual client-side refresh as opposed to auto-refresh on save when using other testing environments !!
"
echo "              ______________________________________________________________________________________________________________________________________________________________________________________________ "  
echo "             |                                                                                                                                                                                              |"
echo "             |    Documentation: https://webpack.js.org/guides/development/#using-webpack-dev-server                                                                                                        |"
echo "             |                                                                                                                                                                                              |"
echo "             |   'webpack-dev-server doesnt write any output files after compiling. Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path.' |"
echo "             |______________________________________________________________________________________________________________________________________________________________________________________________|

"
echo '              PLEASE execute `npm run webpack` (be mindful of the `dev_mode:` flag that toggles dev/prod mode)

'
echo "              Compile before going to into your personal dev server/testing environment of choice !!              "