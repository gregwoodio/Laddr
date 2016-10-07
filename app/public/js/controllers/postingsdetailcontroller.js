laddrControllers.controller('PostingsDetailController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 'LoginService',
  function($scope, $location, $http, $routeParams, $sessionStorage, LoginService) {

  $scope.posting = {};
  $scope.$storage = $sessionStorage;

  if (LoginService.isLoggedIn() != undefined) {

    $http
      .get('/api/posting/' + $routeParams.id, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.posting.PostingID = data.PostingID;
        $scope.posting.OrganizationName = data.OrganizationName;
        $scope.posting.JobTitle = data.JobTitle;
        $scope.posting.Location = data.Location;
        $scope.posting.Description = data.Description;
        $scope.posting.Timestamp = data.Timestamp;
        $scope.posting.Address = data.Address;
        $scope.posting.MissionStatement = data.MissionStatement;
        $scope.posting.PictureURL = data.PictureURL;
      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = 'Could not retrieve posting. Please try again later.';
      });
  } else {
    $location.url('/login');
  }

  $scope.apply = function() {
    // logged in user applies to posting
    $http
      .post('/api/apply', $scope.posting, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        console.log('Successful application.');
        $location.url('/applications');
      })
      .error(function(data, status, headers, config) {
        console.log('Error while applying');
        console.log(data);
        console.log(status);
        $scope.applyError = 'Sorry, there was a problem applying to the job. Please try again later.';
      });

  };

}]);