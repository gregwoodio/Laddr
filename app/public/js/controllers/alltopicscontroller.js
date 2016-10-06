laddrControllers.controller('AllTopicsController', ['$scope', '$location', '$http', '$sessionStorage', function($scope, $location, $http, $sessionStorage) {
  $scope.$storage = $sessionStorage;
  $scope.topics = [];

  if ($scope.$storage.ldrToken != undefined) {
    $http
      .get('/api/topic', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.topics = data;

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
}]);