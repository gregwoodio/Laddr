laddrControllers.controller('AllTopicsController', ['$scope', '$location', '$http', '$sessionStorage', function($scope, $location, $http, $sessionStorage) {
  $scope.$storage = $sessionStorage;
  $scope.topics = [];
  $scope.page = 0;

  if ($scope.$storage.ldrToken != undefined) {
    $http
      .get('/api/topic', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
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
  }

  $scope.prevPage = function() {
    $scope.page--;
    if ($scope.page < 0) {
      $scope.page = 0;
    }
  }
}]);