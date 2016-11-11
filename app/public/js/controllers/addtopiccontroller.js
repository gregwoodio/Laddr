laddrControllers.controller('AddTopicController', ['$location', '$scope','$http', 'LoginService',
  function($location, $scope, $http, LoginService) {

  if (!LoginService.isLoggedIn()) {
    $location.url('/login');
  }

  $scope.submitTopic = function() {

    data = {
      Title: $scope.topic.title,
      Body: $scope.topic.body
    };

    $http
      .post('/api/topic', data, {
        headers: {
          'x-access-token': LoginService.getToken()
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