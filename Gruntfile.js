module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'release/styles/style.css': 'src/styles/index.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        "overrideBrowserslist": [
                            "defaults"
                        ]
                    })
                ]
            },
            dist: {
                src: 'release/styles/*.css'
            }
        },
        concat: {
            scripts: {
                files: {
                    'release/scripts/main.js': [
                        'src/scripts/main.js',
                        // 'source/scripts/tabs.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'release/scripts/main.min.js': ['release/scripts/main.js']
                }
            }
        },
        watch: {
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['concat']
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask("default", ["newer:sass", "newer:concat", "newer:postcss", "watch"]);
    grunt.registerTask("all", ["sass", "concat", "postcss"]);
    grunt.registerTask("dist", ["uglify"]);

};