//Gruntfile.js

module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			build: {
				files: {
					'app/public/css/style.css': ['app/public/css/style.less']
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
	    			'app/public/js/laddr.min.js': ['app/public/js/laddr_app.js', 'app/public/js/laddr_controllers.js', 'app/public/js/controllers/*.js']
    		}
    	}
  	},
  	copy: {
  		angular: {
  			src: 'app/public/components/angular/angular.min.js',
  			dest: 'app/public/js/angular.min.js'
  		},
      angularMap: {
        src: 'app/public/components/angular/angular.min.js.map',
        dest: 'app/public/js/angular.min.js.map'
      },
  		angularRoute: {
  			src: 'app/public/components/angular-route/angular-route.min.js',
    		dest: 'app/public/js/angular-route.min.js'
    	},
      angularRouteMap: {
        src: 'app/public/components/angular-route/angular-route.min.js.map',
        dest: 'app/public/js/angular-route.min.js.map'
      },
    	angularBootstrap: {
    		src: 'app/public/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    		dest: 'app/public/js/ui-bootstrap-tpls.min.js'
    	},
    	angularAnimate: {
    		src: 'app/public/components/angular-animate/angular-animate.min.js',
    		dest: 'app/public/js/angular-animate.min.js'
    	},
      angularAnimateMap: {
        src: 'app/public/components/angular-animate/angular-animate.min.js.map',
        dest: 'app/public/js/angular-animate.min.js.map'
      },
    	ngStorage: {
    		src: 'app/public/components/ngstorage/ngStorage.min.js',
    		dest: 'app/public/js/ngstorage.min.js'
    	},
    	jquery: {
    		src: 'app/public/components/jquery/dist/jquery.min.js',
    		dest: 'app/public/js/jquery.min.js'
    	},
    	bootstrap: {
    		src: 'app/public/components/bootstrap/dist/js/bootstrap.min.js',
    		dest: 'app/public/js/bootstrap.min.js'
    	},
      bootstrapCSS: {
        src: 'app/public/components/bootstrap/dist/css/bootstrap.min.css',
        dest: 'app/public/css/bootstrap.min.css'
      },
      bootstrapCssMap: {
        src: 'app/public/components/bootstrap/dist/css/bootstrap.min.css.map',
        dest: 'app/public/css/bootstrap.min.css.map'
      },
    	fontawesome: {
    		src: 'app/public/components/font-awesome/css/font-awesome.css',
    		dest: 'app/public/css/font-awesome.css'
    	},
      ngFileUpload: {
        src: 'app/public/components/ng-file-upload/ng-file-upload.min.js',
        dest: 'app/public/js/ng-file-upload.min.js'
      }
  	}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
};