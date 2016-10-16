laddrControllers.controller('LoginController', ['$scope', '$http', '$routeParams', '$location', 'LoginService',
  function($scope, $http, $routeParams, $location, LoginService) {

  if (LoginService.isLoggedIn()) {
    $location.url('/profile');
  }

  $scope.login = function() {

    data = {
      Email: $scope.user.email,
      Password: $scope.user.password
    };

    $http
      .post('/api/login', data)
      .success(function(data, status, headers, config) {
        if (data.success) { 
          LoginService.setToken(data.token);
          LoginService.setProfile(data.profile);
          $scope.isLoggedIn = LoginService.isLoggedIn();

          $location.url('/feed');
        } else {
          console.log("Bad login 1");

          LoginService.setProfile(undefined);
          LoginService.setToken(undefined);

          $scope.message = data != undefined ? data.message : 'Cannot connect to Laddr, please try again later.';

        }
      })
      .error(function(data, status, headers, config) {
        console.log("Bad login 2");

        LoginService.setProfile(undefined);
        LoginService.setToken(undefined);

        $scope.message = data != undefined ? data.message : 'Cannot connect to Laddr, please try again later.';

      });
  };
}]);