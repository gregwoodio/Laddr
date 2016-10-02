// laddr_app.js

(function () {
	var laddrApp = angular.module('laddrApp', [
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap',
	    'laddrControllers',
	    'ngStorage',
	]);

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
		otherwise({
			redirectTo: '/login'
		});
	}]);
})();
