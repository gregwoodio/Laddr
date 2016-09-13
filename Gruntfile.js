//Gruntfile.js

module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			build: {
				files: {
					'app/public/css/bootstrap.css': ['app/public/components/bootstrap/less/bootstrap.less']
				}
			}
		},
		cssmin: {
			build: {
				files: {
					'app/public/css/style.min.css': ['app/public/css/style.css'],
					'app/public/css/bootstrap.min.css': ['app/public/css/bootstrap.css']
				}
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
	    	build: {
	    		files: {
	    			'app/public/js/laddr.min.js': ['app/public/js/laddr_app.js', 'app/public/js/laddr_controllers.js']
	    		}
	    	}
	  	},
	  	copy: {
	  		angular: {
	  			src: 'app/public/components/angular/angular.min.js',
	  			dest: 'app/public/js/angular.min.js'
	  		},
	  		angularRoute: {
	  			src: 'app/public/components/angular-route/angular-route.min.js',
	    		dest: 'app/public/js/angular-route.min.js'
	    	},
	    	angularBootstrap: {
	    		src: 'app/public/components/angular-bootstrap/ui-bootstrap.min.js',
	    		dest: 'app/public/js/angular-bootstrap.min.js'
	    	},
	    	ngStorage: {
	    		dest: 'app/public/components/ngstorage/ngStorage.min.js',
	    		src: 'app/public/js/ngstorage.min.js'
	    	},
	    	jquery: {
	    		src: 'app/public/components/jquery/dist/jquery.min.js',
	    		dest: 'app/public/js/jquery.min.js'
	    	},
	    	bootstrap: {
	    		src: 'app/public/components/bootstrap/dist/js/bootstrap.min.js',
	    		dest: 'app/public/js/bootstrap.min.js'
	    	}
	  	}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
};