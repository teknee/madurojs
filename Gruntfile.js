module.exports = function(grunt) {
		grunt.initConfig({
				concat: {
					options: {
						separator: '\n',
					},
					dist: {
						src: ['src/core.js', 'src/classes/*.js'],
						dest: 'build/maduro.js',
					},
				},
				copy: {
			        build: {
			            cwd: 'build',
			            src: [ '**' ],
			            dest: 'dist',
			            expand: true
			        },
			    },
				umd: {
					all: {
						options: {
							template: 'templates/umd.hbs',
							src: 'build/maduro.js',
							objectToExport: 'maduro',
							globalAlias: 'maduro',
							indent: 4
						}
					}
				},
				mochaTest: {
					test: {
						options: {
							reporter: 'spec',
							captureFile: 'results.txt', // Optionally capture the reporter output to a file
							quiet: false, // Optionally suppress output to standard out (defaults to false)
							clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
						},
						src: ['test/*-spec.js']
					}
				},
				uglify: {

					dist: {
						files: {
							'dist/maduro.min.js': ['build/maduro.js']
						}
					}
				},
				jsbeautifier: {
					files: ['maduro.js', 'src/*.js', 'test/*.js'],
					options: {
					          js: {
					              jslintHappy: true,
					          }
					 }
				}
				});

			require("load-grunt-tasks")(grunt);

			grunt.registerTask('build', ['jsbeautifier', 'concat', 'umd:all', 'mochaTest', 'copy:build', 'uglify']);
			grunt.registerTask('test', ['jsbeautifier', 'concat', 'umd:all', 'mochaTest']);
			// 	grunt.registerTask('doc', ['shell:jsdoc']);
			// 	grunt.registerTask('default', ['build', 'test', 'doc']);
		};
