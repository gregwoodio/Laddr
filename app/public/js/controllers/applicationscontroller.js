// applicationscontroller.js

laddrControllers.controller('ApplicationsController', ['$scope', '$http', '$location', 'LoginService',
  function($scope, $http, $location, LoginService) {

  $scope.applications = {};

  if (LoginService.isLoggedIn()) {
    $http.get('/api/applications', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.applications = data.applications;

        for (i = 0; i < $scope.applications; i++) {
          if ($scope.applications[i].ApplicationStatus == 0) {
            $scope.applications[i].ApplicationStatus = 'Pending';
          } else if ($scope.applications[i].ApplicationStatus == 1) {
            $scope.applications[i].ApplicationStatus = 'Rejected';
          } else if ($scope.applications[i].ApplicationStatus == 2) {
            $scope.applications[i].ApplicationStatus = 'Accepted';
          } else if ($scope.applications[i].ApplicationStatus == 3) {
            $scope.applications[i].ApplicationStatus = 'Cancelled';
          }
        }
      })
      .error(function(data, status, headers, config) {
        $scope.errorMessage = 'Couldn\'t retrieve your applications! Please try again later.';
      });
  } else {
    $location.url('/login');
  }

}]);