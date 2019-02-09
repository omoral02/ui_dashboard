module.exports = function(grunt) {
const webpackConfig = require('./webpack.config.js');
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
           options: {
            jshintrc: '.jshintrc'
          },
          files: ['./src/index.js', './src/js/*.js', './src/gator_components/dynamic_map_tester/js/*.js', 
            './src/gator_components/main_app/js/*.js', './src/gator_components/plx/js/*.js', 
            './src/gator_components/static_map_tester_component/js/*.js', './src/gator_components/ws_tester/js/*.js',
            './src/index.js', './package.json', 'Gruntfile.js', '.jshintrc', './webpack.config.js']
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
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
                entry: __dirname + '/src/index.js',
                output: {
                path: __dirname + '/myapp/public/javascripts',
                filename: 'bundle.js'    
                },
                mode: 'development',
                module: {
                  rules: [
                    {
                      test: /\.m?js$/,
                      exclude: /(node_modules|bower_components)/,
                      use: {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env', 'es2015'],
                          plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                      }
                    }
                  ]
                }
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        }
    });

    // Load Grunt plugins 
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-webpack');

    // Register tasks
    grunt.registerTask('default', ['jshint', 'jsdoc']);
};