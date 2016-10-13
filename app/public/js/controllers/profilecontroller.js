laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 
  function($scope, $http, $routeParams, $location, $sessionStorage) {
  
  $scope.$storage = $sessionStorage;
  $scope.academics = undefined;

  if ($scope.$storage.ldrToken != undefined) {

    $scope.profile = {};
    $scope.logout = false;

    $http
      .get('/api/profile', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.profile = data;
        $scope.profile.PictureURL = 'https://www.orthoneuro.com/wp-content/themes/orthoneuro/images/generic-profile.jpg';

        if ($scope.profile.LdrUser.AcademicStatus) {
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