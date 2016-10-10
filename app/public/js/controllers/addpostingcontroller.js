laddrControllers.controller('AddPostingController', ['$location', '$scope','$http', '$sessionStorage', 'LoginService',
  function($location, $scope, $http, $sessionStorage, LoginService) {

  $scope.posting = {
    ProfileID: LoginService.getProfile().ProfileID,
    JobTitle: undefined,
    Location: undefined,
    Description: undefined
  };

  $scope.addPosting = function() {

    data = $scope.posting;

    $http
      .post('/api/posting', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        if (data) {
          $location.url('/postings');
        } else {
          console.log('Failed to add posting.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('Failed to add posting, part 2.');
        console.log(data);
        console.log(status);
      });
  };

}]);