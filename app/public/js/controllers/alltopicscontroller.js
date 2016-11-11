laddrControllers.controller('AllTopicsController', ['$scope', '$location', '$http', 'LoginService', 
  function($scope, $location, $http, LoginService) {

  $scope.topics = [];
  $scope.page = 0;

  if (LoginService.isLoggedIn()) {
    $http
      .get('/api/topic', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        // pagination
        tpp = 10; //topics per page ;)
        for (i = 0; i < data.length; i += tpp) {
          $scope.topics.push(data.slice(i, i + tpp));
        }

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get topic
        $scope.message = "Could not retrieve topic. Please try again later.";
      });
  } else {
    $location.url('/login');
  }

  $scope.nextPage = function() {
    $scope.page++;
    if ($scope.page >= $scope.postings.length) {
      $scope.page = $scope.postings.length - 1;
    }
  };

  $scope.prevPage = function() {
    $scope.page--;
    if ($scope.page < 0) {
      $scope.page = 0;
    }
  };
  
}]);