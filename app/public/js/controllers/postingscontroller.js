laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 'LoginService',
  function($scope, $location, $http, $routeParams, $sessionStorage, LoginService) {
    
  $scope.postings = [];
  $scope.page = 0;
  $scope.$storage = $sessionStorage;

  if (LoginService.isLoggedIn()) {
    $http
      .get('/api/posting', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        // pagination
        ppp = 2; //postings per page ;)
        for (i = 0; i < data.length; i += ppp) {
          $scope.postings.push(data.slice(i, i + ppp));
        }

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
    if ($scope.page >= $scope.postings.length) {
      $scope.page = $scope.postings.length - 1;
    }
  }

  $scope.prevPage = function() {
    $scope.page--;
    if ($scope.page < 0) {
      $scope.page = 0;
    }
  }
}]);