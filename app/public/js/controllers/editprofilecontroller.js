laddrControllers.controller('EditProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 'LoginService',
  function($scope, $http, $routeParams, $location, $sessionStorage, LoginService) {

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
        $scope.isLoggedIn = LoginService.isLoggedIn();
      })
      .error(function(data, status, headers, config) {
        console.log('Could not retrieve user.');
        $location.url('/login');
      });
  } else {
    $location.url('/login');
  }

  $scope.editVolunteer = function() {
    data = {
      FirstName: $scope.profile.LdrUser.FirstName,
      LastName: $scope.profile.LdrUser.LastName,
      AcademicStatus: $scope.profile.LdrUser.AcademicStatus,
      Description: $scope.profile.LdrUser.Description,
      Email: $scope.profile.Email,
    };

    console.log(data);

    $http
      .put('/api/user', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        console.log('Successful edit.');
        if (data) {
          $location.url('/profile');
        } else {
          console.log('Edit volunteer failed.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('AJAX error editing profile.');
        console.log(data);
        console.log(status);
        $scope.message = 'Error updating profile. Please try again later.';
      });
  };

  $scope.editOrganization = function() {
    data = {
      Email: $scope.profile.Email,
      OrganizationName: $scope.profile.LdrOrganization.OrganizationName,
      URL: $scope.profile.LdrOrganization.URL,
      MissionStatement: $scope.profile.LdrOrganization.MissionStatement,
      AddressLine1: $scope.profile.LdrOrganization.AddressLine1,
      AddressLine2: $scope.profile.LdrOrganization.AddressLine2,
      City: $scope.profile.LdrOrganization.City,
      Province: $scope.profile.LdrOrganization.Province,
      Postal: $scope.profile.LdrOrganization.Postal
    };

    console.log(data);

    $http
      .put('/api/organization', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        console.log('Successful edit.');
        if (data) {
          $location.url('/profile');
        } else {
          console.log('Edit volunteer failed.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('AJAX error editing profile.');
        console.log(data);
        console.log(status);
        $scope.$storage.ldrToken = null;
        $scope.message = 'Error updating profile. Please try again later.';
      });
  };
}]);