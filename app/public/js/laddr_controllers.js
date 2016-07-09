// laddr_controllers.js

var laddrControllers = angular.module("laddrControllers", []); //normally [] contains dependencies

laddrControllers.controller('HomePartialController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        
}]);

laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
	
    if (window.sessionStorage.ldrToken != undefined) {

        $scope.profile = {};

        $http
            .get('/api/user', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                }
            })
            .success(function(data, status, headers, config) {

                $scope.profile.Username = data.Username;
                $scope.profile.Email = data.Email;
                $scope.profile.PictureURL = data.PictureURL;
            })
            .error(function(data, status, headers, config) {
                console.log("Could not retrieve user.");
                $location.url('/login');
            });
    } else {
        $location.url('/login');
    }
}]);

laddrControllers.controller('LoginController', ['$scope', '$http', '$routeParams', "$location", function($scope, $http, $routeParams, $location) {
    
    $scope.login = function() {

        data = {
            Username: $scope.user.username,
            Password: $scope.user.password
        };

        $http
            .post('/api/login', data)
            .success(function(data, status, headers, config) {
                if (data.success) {
                    window.sessionStorage.ldrToken = data.token;
                    $location.url('/profile');
                } else {
                    console.log("Bad login");
                }
            })
            .error(function(data, status, headers, config) {
                delete window.sessionStorage.ldrToken;
                console.log("Bad login");
            });
    };
}]);