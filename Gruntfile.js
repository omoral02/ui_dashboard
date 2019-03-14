module.exports = function(grunt) {
const webpackConfig = require('./webpack.config.babel.js');
    grunt.initConfig({
        // concat: {
        //   release: {
        //     src: ['js/values.js', 'js/prompt.js', 'js/getImages.js', 'js/replaceImages.js', 'js/main.js'],
        //     dest: 'release/main.js'
        //   }
        // },
        copy: {
          release: {
            src: 'src/images/lockup.png',
            dest: 'dist/public/images/lockup.png'
          }
        },
        jshint: {
           options: {
            jshintrc: '.jshintrc'
          },
          files: [
            './src/index.js', './src/js/main.js', 
            './src/js/gator_components/main_app/js/*.js','./src/js/gator_components/ws_tester/js/*.js', 
            './dist/app.js', './dist/routes/*.js', './dist/bin/*', './package.json', 'Gruntfile.js', '.jshintrc', '.babelrc', './webpack.config.babel.js']
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
            prod: Object.assign({ watch: false }, webpackConfig),
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
    grunt.registerTask('default', ['copy', 'jshint', 'jsdoc', 'watch']);
};