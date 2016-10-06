laddrControllers.controller('AddTopicController', ['$location', '$scope','$http', '$sessionStorage', 
  function($location, $scope, $http, $sessionStorage) {

  $scope.$storage = $sessionStorage;
  $scope.logout = true;

  $scope.submitTopic = function() {

    data = {
      Title: $scope.topic.title,
      Body: $scope.topic.body
    };

    $http
      .post('/api/topic', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        if (data) {
          $location.url('/forum');
        } else {
          console.log('Failed to add topic.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('Failed to add topic, part 2.');
      });
  }

}]);