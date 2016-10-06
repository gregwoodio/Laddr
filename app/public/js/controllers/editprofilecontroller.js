laddrControllers.controller('EditProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage',
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
        $scope.logout = true;
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
      FirstName: $scope.profile.FirstName,
      LastName: $scope.profile.LastName,
      AcademicStatus: $scope.profile.AcademicStatus,
      Description: $scope.profile.Description,
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
        $scope.$storage.ldrToken = null;
        $location.url('/login');
      });
  };

  $scope.editOrganization = function() {
    data = {
      Email: $scope.profile.Email,
      OrganizationName: $scope.profile.OrganizationName,
      URL: $scope.profile.URL,
      MissionStatement: $scope.profile.MissionStatement,
      AddressLine1: $scope.profile.AddressLine1,
      AddressLine2: $scope.profile.AddressLine2,
      City: $scope.profile.City,
      Province: $scope.profile.Province,
      Postal: $scope.profile.Postal
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
        $location.url('/login');
      });
  };
}]);