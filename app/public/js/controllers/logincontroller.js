laddrControllers.controller('LoginController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 'LoginService',
  function($scope, $http, $routeParams, $location, $sessionStorage, LoginService) {
    
  $scope.$storage = $sessionStorage;
  $scope.isLoggedIn = false;

  $scope.login = function() {

    data = {
      Email: $scope.user.email,
      Password: $scope.user.password
    };

    $http
      .post('/api/login', data)
      .success(function(data, status, headers, config) {
        if (data) { 
          LoginService.setToken(data.token);
          LoginService.setProfile(data.profile);
          $scope.isLoggedIn = LoginService.isLoggedIn();

          $location.url('/profile');
        } else {
          console.log("Bad login 1");

          $scope.$storage.ldrToken = undefined;
          LoginService.setProfile(undefined);
          LoginService.setToken(undefined);

          console.log("LoginController emitting refreshNavbar");

        }
      })
      .error(function(data, status, headers, config) {
        console.log("Bad login 2");

        $scope.$storage.ldrToken = null;
        LoginService.setProfile(undefined);
        LoginService.setToken(undefined);

      });
  };
}]);