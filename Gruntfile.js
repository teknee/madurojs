module.exports = function(grunt) {
		grunt.initConfig({
				concat: {
					options: {
						separator: '\n',
					},
					dist: {
						src: 'src/*.js',
						dest: 'dist/maduro.js',
					},
				},
				umd: {
					all: {
						options: {
							template: 'templates/umd.hbs',
							src: 'dist/maduro.js',
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
							'maduro.min.js': ['maduro.js']
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
					// 		writeBowerJson: {
					// 			options: {
					// 				bowerJsonTemplate: 'templates/bower-buckets.json'
					// 			}
					// 		}
				});

			require("load-grunt-tasks")(grunt);

			// 	grunt.registerTask('reformat', ['jsbeautifier']);
			grunt.registerTask('build', ['concat', 'umd:all', 'mochaTest', 'jsbeautifier', 'uglify']); 
			grunt.registerTask('test', ['jsbeautifier', 'concat', 'umd:all', 'mochaTest']);
			// 	grunt.registerTask('doc', ['shell:jsdoc']);
			// 	grunt.registerTask('default', ['build', 'test', 'doc']);
		};