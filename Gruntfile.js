module.exports = function(grunt) {
//Définition de la configuration globale de grunt et des tâches exécutables    
    grunt.initConfig({
        //Configuration globale de grunt
        pkg: grunt.file.readJSON('package.json'),
        // Config de chaque plugin
        concat: {
            app: {
                src: [
                    'app/app.js',
                    'app/*.factory.js',
                    'app/*.service.js',
                    'app/*.controller.js'
                ],
                dest: 'dist/app.js'
            }
        },
        cssmin: {
            //Définition des tâches (voir sur le site 
            //du plugin : https://github.com/gruntjs/grunt-contrib-cssmin#cssmin-task)
            app: {
                files: {
                    'dist/app.min.css': ['app.css']
                }
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    mangle: false //Remplacement
                },
                files: {
                    'dist/bundle.min.js' : [
                        'node_modules/angular/angular.min.js',
                        'dist/app.js'
                    ]
                }
            }
        },
        watch: {
            cssSrc: {
              files: ['**/*.css', '!node_modules/**'],
              tasks: ['cssmin:app']
            },
            jsSrc: {
                files: ['app/*.js'],
                tasks: ['concat:app']
            }
        },
    });
//Chargement des plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

//Déclaration des tâches exécutables
    //Lance le script app du plugin cssmin quand on lance juste >grunt en ligne de commande.
    grunt.registerTask('default', ['cssmin:app', 'concat:app']);
    grunt.registerTask('reload', ['watch']);    
    //Lance le script cssmin du plugin cssmin quand on lance juste >grunt gencss en ligne de commande.
    grunt.registerTask('gencss', ['cssmin']);
    //Lance le script watch:cssSrc et watch:jsSrc quand on execute >grunt --dev
    grunt.registerTask('dev', ['watch:cssSrc'], ['watch:jsSrc']);
};
