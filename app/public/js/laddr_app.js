// laddr_app.js

(function () {
	var laddrApp = angular.module('laddrApp', [
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap',
	  'laddrControllers',
	  'ngStorage',
	  'ngFileUpload'
	]);

	laddrApp.service('LoginService', ['$rootScope', function($rootScope) {
		
		this.setProfile = function(profile) {
			console.log('LoginService setting profile');
			$rootScope.profile = profile;
		};

		this.getProfile = function() {
			console.log('LoginService returning profile');
			return $rootScope.profile;
		};

		this.setToken = function(token) {
			console.log('LoginService setting token');
			$rootScope.token = token;
		};

		this.getToken = function() {
			console.log('LoginService returning token');
			return $rootScope.token;
		};

		this.isLoggedIn = function() {
			console.log('LoginService checking login status');
			console.log($rootScope.profile != undefined);
			return $rootScope.profile != undefined;
		};

	}]);

	laddrApp.directive('header', function() {
		return {
			restrict: 'A', //must be on an attribute, not element
			replace: true,
			scope: false,
			templateUrl: 'js/directives/header.html',
			controller: ['$scope', '$rootScope', 'LoginService',
			  function($scope, $rootScope, LoginService) {

			  $scope.isLoggedIn = LoginService.isLoggedIn();
			  if ($scope.isLoggedIn) {
			    $scope.isUser = LoginService.getProfile().AccountType == 0;
			  }
			}]
		}
	});

	laddrApp.directive('navbar', function() {
		return {
			restrict: 'A', //must be on an attribute, not element
			replace: true,
			scope: false,
			templateUrl: 'js/directives/navbar.html',
			controller: ['$scope', '$rootScope', 'LoginService',
			  function($scope, $rootScope, LoginService) {

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
			controller: ['$scope', '$rootScope', 'LoginService',
			  function($scope, $rootScope, LoginService) {

			  $scope.isLoggedIn = LoginService.isLoggedIn();
			  if ($scope.isLoggedIn) {
			    $scope.isUser = LoginService.getProfile().AccountType == 0;
			  }
			}]
		}
	});	


	laddrApp.config(['$routeProvider', function($routeProvider) {
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
		otherwise({
			redirectTo: '/home'
		});
	}]);
})();