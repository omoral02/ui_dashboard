module.exports = function(grunt) {
<<<<<<< HEAD
const webpackConfig = require('./webpack.config');
=======
const webpackConfig = require('./webpack.config.babel.js');
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
    grunt.initConfig({
        // concat: {
        //   release: {
        //     src: ['js/values.js', 'js/prompt.js', 'js/getImages.js', 'js/replaceImages.js', 'js/main.js'],
        //     dest: 'release/main.js'
        //   }
        // },
<<<<<<< HEAD
        // copy: {
        //   release: {
        //     src: 'src/images/lockup.png',
        //     dest: 'dist/public/images/lockup.png'
        //   }
        // },
=======
        copy: {
          release: {
            src: 'src/images/lockup.png',
            dest: 'dist/public/images/lockup.png'
          }
        },
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
        jshint: {
           options: {
            jshintrc: '.jshintrc'
          },
          files: [
<<<<<<< HEAD
            //source for client-side scripts (e.g -- entry point -- main module init scripts -- intra-module scripts)
            '.src/js/*.js', './src/js/gator_components/**/*.js', './src/js/gator_components/**/**/*.js', 
            //srouce for runtime & development scripts 
            './src/bin/*', './src/app.js', './src/routes/*.js', './package.json', 'Gruntfile.js', '.jshintrc', '.babelrc', '.eslintrc']
=======
            './src/index.js', './src/js/main.js', 
            './src/js/gator_components/dynamic_map_tester/js/*.js', 
            // './src/js/gator_components/dynamic_map_tester/js/map_modules/*.js', 
            // ommitted since the errors thrown here are many per the very much needed refactoring for those (not yet used)modules.
            './src/js/gator_components/main_app/js/*.js', './src/js/gator_components/static_map_tester_component/js/*.js', './src/js/gator_components/ws_tester/js/*.js', 
            './dist/app.js', './dist/routes/*.js', './dist/bin/*', './package.json', 'Gruntfile.js', '.jshintrc', '.babelrc', './webpack.config.babel.js']
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
        },
        jasmine: { 
          test: {
            src: ['<%= jshint.files %>']
          }
        },
        watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['default'] 
        },
        jsdoc: {
          dist: {
            src: ['<%= jshint.files %>'],
            dest: 'doc'
          }
        },
        webpack: {
            options: webpackConfig,
<<<<<<< HEAD
            prod: webpackConfig,
=======
            prod: Object.assign({ watch: false }, webpackConfig),
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
            dev:  webpackConfig
        }
    });

    // Load Grunt plugins 
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-webpack');

    // Register tasks
<<<<<<< HEAD
    grunt.registerTask('default', ['jshint', 'jsdoc', 'webpack', 'watch']);
=======
    grunt.registerTask('default', ['copy', 'jshint', 'jsdoc']);
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
};