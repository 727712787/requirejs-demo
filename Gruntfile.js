module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			options: {
				port: 80,
				hostname: '127.0.0.1',
				livereload: 9527
			},
			server: {
				options: {
					open: true,
					base: [
						'website'
					]
				}
			}
		},
		qunit: {
			files: ['test/*.html']
		},
		jshint: {
			files: ['gruntfile.js', 'js/*.js'],
				options: {
	                curly: true,
	                eqeqeq: true,
	                newcap: true,
	                noarg: true,
	                sub: true,
	                undef: true,
	                boss: true,
	                node: true
	            },
				globals: {
					exports: true
				}
		},
		watch: {
			options: {
				livereload: '<%=connect.options.livereload%>'
			},
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'styles',
		      src: ['**/*.css', '!*.min.css'],
		      dest: 'rel_styles'
		    }]
		  }
		},
		requirejs: {
			build: {
				options: {
					appDir: 'js',
					baseUrl: '.',
					dir: 'build',
					preserveLicenseComments: false,
					mainConfigFile:'js/app.js',
					modules: [{
						name: 'app'
					}],
					fileExclusionRegExp: /^(r|build|script)\.js$/
					
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint'); 
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadTasks('tasks');
	// 注册任务
	grunt.registerTask('default', ['jshint', 'qunit']);
	grunt.registerTask('server', ['connect:server', 'watch']);
	grunt.registerTask('releave', ['requirejs','cssmin','jshint', 'qunit']);
};