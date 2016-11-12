laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', 'LoginService',
  function($scope, $location, $http, $routeParams, LoginService) {
    
  $scope.postings = [];
  $scope.page = 1;
  $scope.ppp = 6;

  if (LoginService.isLoggedIn()) {
    $http
      .get('/api/posting', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.postings = data;

      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve postings. Please try again later.";
      });
  } else {
    $location.url('/login');
  }

  $scope.nextPage = function() {
    $scope.page++;
    if ($scope.page >= Math.ceil($scope.filtered.length / $scope.ppp)) {
      $scope.page = Math.ceil($scope.filtered.length  / $scope.ppp);
    }
  }

  $scope.prevPage = function() {
    $scope.page--;
    if ($scope.page < 1) {
      $scope.page = 1;
    }
  }

  $scope.resetPages = function() {
    $scope.page = 1;
  }
}]);