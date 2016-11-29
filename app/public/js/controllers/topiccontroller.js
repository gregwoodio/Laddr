laddrControllers.controller('TopicController', ['$scope', '$location', '$http', '$routeParams', 'LoginService',
  function($scope, $location, $http, $routeParams, LoginService) {
    
  $scope.topic = {};
  
  $scope.topicId = $routeParams.id;
  $scope.replyToggle = false; 
  $scope.reply = '';

  $scope.submitReply = function() {
    data = {
      TopicID: $scope.topicId,
      ProfileID: LoginService.getProfile().ProfileID,
      Body: $scope.reply
    };

    $http
      .post('/api/comment', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.getComments();
        $scope.replyToggle = false;
        $scope.reply = '';
      })
      .error(function(data, status, headers, config) {
        $scope.replyMessage = 'Couldn\'t add a reply. Please try again later.';
      });
  };

  $scope.getComments = function() {
    $http
      .get('/api/topic/' + $routeParams.id, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.topic = data.topic;
        $scope.comments = data.comments;

      })
      .error(function(data, status, headers, config) {
        $scope.message = "Could not retrieve topic. Please try again later.";
      });
  }


  if (!LoginService.isLoggedIn()) {
    $location.url('/login');
  }
  $scope.getComments();

}]);