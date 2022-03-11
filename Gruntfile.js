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
                entry: './src/app.js',
                output: {
                    path: 'build',
                    filename: 'app.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('dev', ['copy:dev', 'webpack:dev']);
}