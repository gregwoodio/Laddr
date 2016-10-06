laddrControllers.controller('AddPostingController', ['$location', '$scope','$http', '$sessionStorage', 'LoginService',
  function($location, $scope, $http, $sessionStorage, LoginService) {

  $scope.posting = {
    ProfileID: LoginService.getProfile().ProfileID,
    JobTitle: 'The name of the position.',
    Location: 'Enter the location here.',
    Description: 'A description of the required role and duties.'
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