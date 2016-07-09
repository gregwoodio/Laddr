// laddr_app.js

(function () {
	var laddrApp = angular.module('laddrApp', [
		'ngRoute',
		'ui.bootstrap',
	    'laddrControllers'
	]);

	laddrApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
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
		otherwise({
			redirectTo: '/login'
		});
	}]);
})();

/*
craftingGuide.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/view/:blockName', {
        templateUrl: 'partials/view.html',
        controller: 'ListController'
    }).
    otherwise({
        redirectTo: '/view/null'
    });
}]);
*/