module.exports = function(grunt) {
const webpackConfig = require('./webpack.config');
    grunt.initConfig({
        // concat: {
        //   release: {
        //     src: ['js/values.js', 'js/prompt.js', 'js/getImages.js', 'js/replaceImages.js', 'js/main.js'],
        //     dest: 'release/main.js'
        //   }
        // },
        // copy: {
        //   release: {
        //     src: 'src/images/lockup.png',
        //     dest: 'dist/public/images/lockup.png'
        //   }
        // },
        jshint: {
           options: {
            jshintrc: '.jshintrc'
          },
          files: [
            //source for client-side scripts (e.g -- entry point -- main module init scripts -- intra-module scripts)
            '.src/js/*.js', './src/js/gator_components/**/*.js', './src/js/gator_components/**/**/*.js', 
            //srouce for runtime & development scripts 
            './src/bin/*', './src/app.js', './src/routes/*.js', './package.json', 'Gruntfile.js', '.jshintrc', '.babelrc', '.eslintrc']
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
            prod: webpackConfig,
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
    grunt.registerTask('default', ['jshint', 'jsdoc', 'webpack', 'watch']);
};