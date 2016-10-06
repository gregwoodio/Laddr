laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 'LoginService',
  function($scope, $location, $http, $routeParams, $sessionStorage, LoginService) {
    
  $scope.postings = {};
  $scope.$storage = $sessionStorage;

  if (LoginService.isLoggedIn()) {
    $http
      .get('/api/posting', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        $scope.postings = data;

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve postings. Please try again later.";
      });
  } else {
    $location.url('/login');
  }
}]);