// laddr_app.js

(function () {
	var laddrApp = angular.module('laddrApp', [
        'ngSanitize',
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap',
	  'laddrControllers',
	  'ngStorage',
	  'ngFileUpload',
	  'nemLogging',
	  'uiGmapgoogle-maps',
        'ui.tinymce'
        
	])
	// .config(function(uiGmapGoogleMapApiProvider) {
 //    uiGmapGoogleMapApiProvider.configure({
 //        key: 'AIzaSyBrPZaMWBDMB6grdT9hft8yrxpMbGWSvrA',
 //        v: '3.20', //defaults to latest 3.X anyhow
 //        libraries: 'weather,geometry,visualization'
 //    });
	// });

	laddrApp.service('LoginService', ['$rootScope', '$sessionStorage', function($rootScope, $sessionStorage) {
		
		this.setProfile = function(profile) {
			$rootScope.profile = profile;
			$sessionStorage.ldrProfile = profile;
		};

		this.getProfile = function() {
			return $rootScope.profile;
		};

		this.setToken = function(token) {
			$rootScope.token = token;
			$sessionStorage.ldrToken = token;
		};

		this.getToken = function() {
			return $rootScope.token;
		};

		this.isLoggedIn = function() {
			//checks if you've got a profile set in rootscope or sessionStorage
			if ($rootScope.profile) {
				return $rootScope.profile;
			} else if ($sessionStorage.ldrProfile && $sessionStorage.ldrToken) {
				this.setProfile($sessionStorage.ldrProfile);
				this.setToken($sessionStorage.ldrToken);
				return $rootScope.profile;
			}
			return undefined;
		};

	}]);

	laddrApp.directive('header', function() {
		return {
			restrict: 'A', //must be on an attribute, not element
			replace: true,
			scope: false,
			templateUrl: 'js/directives/header.html',
			controller: ['$scope', 'LoginService',
			  function($scope, LoginService) {

			  $scope.isLoggedIn = LoginService.isLoggedIn();
			  if ($scope.isLoggedIn) {
			    $scope.isUser = LoginService.getProfile().AccountType == 0;
			  }
			}]
		}
	});
	
	laddrApp.directive('footer', function() {
		return {
			restrict: 'A', //must be on an attribute, not element
			replace: true,
			scope: false,
			templateUrl: 'js/directives/footer.html',
			controller: ['$scope', 'LoginService',
			  function($scope, LoginService) {

			  $scope.isLoggedIn = LoginService.isLoggedIn();
			  if ($scope.isLoggedIn) {
			    $scope.isUser = LoginService.getProfile().AccountType == 0;
			  }
			}]
		}
	});	

	//postings filter
	laddrApp.filter('startFrom', function() {
    return function(input, start) {
      if(input) {
        start = +start; //parse to int
        return input.slice(start);
      }
      return [];
    }
	});


	laddrApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

		// var app = angular.injector(['laddrApp']);
		// $provide.constant('LoginService', app.get('LoginService'));
		// $httpProvider.defaults.headers['x-access-token'] = LoginService.getToken();

		$routeProvider.
		when('/logout', {
			templateUrl: 'partials/login.html',
			controller: 'LogoutController'
		}).
		when('/home', {
			templateUrl: 'partials/homepartial.html',
			controller: 'HomePartialController'
		}).
		when('/profile', {
			templateUrl: 'partials/profile.html',
			controller: 'ProfileController'
		}).
		when('/editProfile', {
			templateUrl: 'partials/edit_profile.html',
			controller: 'EditProfileController'
		}).
		when('/login', {	
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'RegisterController'
		}).
		when('/howto', {
			templateUrl: '/partials/howto.html',
			controller: 'HowToController'
		}).
		when('/postings/:id', {
			templateUrl: 'partials/postingsdetail.html',
			controller: 'PostingsDetailController'
		}).
		when('/postings', {
			templateUrl: 'partials/postings.html',
			controller: 'PostingsController'
		}).
		when('/forum/:id', {
			templateUrl: 'partials/topic.html',
			controller: 'TopicController'
		}).
		when('/forum', {
			templateUrl: 'partials/alltopics.html',
			controller: 'AllTopicsController'
		}).
		when('/addtopic', {
			templateUrl: 'partials/addtopic.html',
			controller: 'AddTopicController'
		}).
		when('/addposting', {
			templateUrl: 'partials/addposting.html',
			controller: 'AddPostingController'
		}).
		when('/applications', {
			templateUrl: 'partials/applications.html',
			controller: 'ApplicationsController'
		}).
		when('/applicants', {
			templateUrl: 'partials/applicants.html',
			controller: 'ApplicantController'
		}).
		when('/rules', {
			templateUrl: 'partials/rules.html',
		}).
		when('/contact', {
			templateUrl: 'partials/contact.html',
		}).
		when('/aboutus', {
			templateUrl: 'partials/about.html',
		}).
		when('/faq', {
			templateUrl: 'partials/faq.html',
		}).
		when('/feed', {
			templateUrl: 'partials/feed.html',
			controller: 'FeedController'
		}).
		when('/postings/:id/edit_posting', {
			templateUrl: 'partials/postingedit.html',
			controller: 'EditPostingController'
		}).
        when('/resume', {
            templateUrl: 'partials/resume.html',
            controller: 'ResumeController'
        }).

		otherwise({
			redirectTo: '/home'
		});
	}]);
})();