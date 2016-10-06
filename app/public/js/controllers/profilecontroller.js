laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 
  function($scope, $http, $routeParams, $location, $sessionStorage) {
  
  $scope.$storage = $sessionStorage;

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
        // $scope.profile.Email = data.Email;
        // $scope.profile.FirstName = data.FirstName;
        // $scope.profile.LastName = data.LastName;
        $scope.profile.PictureURL = 'https://www.orthoneuro.com/wp-content/themes/orthoneuro/images/generic-profile.jpg';
        // $scope.profile.AccountType = data.AccountType;
        // $scope.profile.Description = data.Description;
        // $scope.profile.Resume = data.Resume;
        // $scope.profile.AcademicStatus = data.AcademicStatus;
        // $scope.profile.OrganizationName = data.OrganizationName;
        // $scope.profile.Address = data.Address;
        // $scope.profile.URL = data.URL;
        // $scope.profile.MissionStatement = data.MissionStatement;
       
        //show logout button
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve user.");
        $location.url('/login');
      });
  } else {
    $location.url('/login');
  }
}]);