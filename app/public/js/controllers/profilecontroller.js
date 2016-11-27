laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', 'LoginService','$sce',
  function($scope, $http, $routeParams, $location, LoginService, $sce) {
  
  $scope.academics = undefined;

  if (LoginService.isLoggedIn()) {

    $scope.profile = {};
      
      
    $scope.isLoggedIn = true;

    $http
      .get('/api/profile', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.profile = data;
        if ($scope.profile.PictureURL == undefined) {
          $scope.profile.PictureURL = 'img/uploads/generic.jpg';
        }

        if ($scope.profile.LdrUser) {
            $scope.profile.LdrUser.Resume = $sce.trustAsHtml($scope.profile.LdrUser.Resume);
          if ($scope.profile.LdrUser.AcademicStatus == 0) {
            $scope.academics = 'Not in school';
          } else if ($scope.profile.LdrUser.AcademicStatus == 1) {
            $scope.academics = 'High School';
          } else if ($scope.profile.LdrUser.AcademicStatus == 2) {
            $scope.academics = 'College';
          } else if ($scope.profile.LdrUser.AcademicStatus == 3) {
            $scope.academics = 'University';
          } else if ($scope.profile.LdrUser.AcademicStatus == 4) {
            $scope.academics = 'Graduated';
          }
        }

      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve user.");
        $location.url('/login');
      });
  } else {
    $location.url('/login');
  }
}]);
