laddrControllers.controller('TopicController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 
  function($scope, $location, $http, $routeParams, $sessionStorage) {
    
  $scope.topic = {};
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {
    // $http
    //   .get('/api/topic', {
    //     headers: {
    //       'x-access-token': $scope.$storage.ldrToken
    //     },
    //     params: {
    //       'tid': $routeParams.id
    //     }
    //   })
    //   .success(function(data, status, headers, config) {

    //     $scope.topic = data;

    //     //show logout
    //     $scope.logout = true;

    //     //nested api calls?
    $http
      .get('/api/topic/' + $routeParams.id, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.topic = data.topic;
        $scope.comments = data.comments;

      })
      .error(function(data, status, headers, config) {
        $scope.message = "Could not retrieve topic. Please try again later.";
      });
          
      // })
      // .error(function(data, status, headers, config) {
      //   //couldn't get topic
      //   $scope.message = "Could not retrieve topic. Please try again later.";
      // });
  } else {
    $location.url('/login');
  }
}]);