module.exports = function(grunt) {
    grunt.initConfig({
        // concat: {
        //   release: {
        //     src: ['js/values.js', 'js/prompt.js', 'js/getImages.js', 'js/replaceImages.js', 'js/main.js'],
        //     dest: 'release/main.js'
        //   }
        // },
        // copy: {
        //   release: {
        //     src: 'manifest.json',
        //     dest: 'release/manifest.json'
        //   }
        // },
        jshint: {
           // options: {
          //   jshintrc: '.jshintrc'
          // },
          files: ['./source/index.js', './source/js/*.js', './source/gator_components/dynamic_map_tester/js/*.js', 
            './source/gator_components/main_app/js/*.js', './source/gator_components/plx/js/*.js', 
            './source/gator_components/static_map_tester_component/js/*.js', './source/gator_components/ws_tester/js/*.js']
        },
        jasmine: { 
          test: {
            src: ['<%= jshint.files %>']
          }
        },
        watch: {
          files: ['<%= jshint.files %>', 'package.json', 'Gruntfile.js'],
          tasks: ['default']
        },
        jsdoc: {
          dist: {
            src: ['<%= jshint.files %>'],
            dest: 'doc'
          }
        }
    });

    // Load Grunt plugins
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Register tasks
    grunt.registerTask('default', ['jshint', 'jsdoc']);
};