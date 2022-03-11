var path = require("path");

module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules',
                        src: ['bootstrap/dist/**'],
                        dest: 'build/assets'
                    }
                ]
            }
        },
        webpack: {
            build: {
                entry: './public/script/app.js',
                output: {
                    path: path.resolve(__dirname, 'build'),
                    filename: 'app.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('dev', ['copy:dev', 'webpack:dev']);
};