laddrControllers.controller('RegisterController', ['$scope', '$http', '$location', '$animate', 
  function($scope, $http, $location, $animate) {

  $scope.accountType = 'volunteer';

  $scope.register = function() {

    if ($scope.user.password1 != $scope.user.password2) {
      return 'Passwords don\'t match.'
    }

    if ($scope.accountType == 'volunteer') {

      data = {
        //user profile
        AccountType: 0,
        Email: $scope.user.email,
        Password: $scope.user.password1,
        FirstName: $scope.user.firstName,
        LastName: $scope.user.lastName,
        AcademicStatus: $scope.user.academicStatus,
        Picture: 'pic.jpg',
        Description: 'description',
        Resume: 'resume'
      };

      $http
        .post('/api/user', data)
        .success(function(data, status, headers, config) {
          if (data) {
            $scope.message = 'New user added.';
            $location.url('/login');
          } else {
            $scope.message = 'We encountered an error and the user wasn\'t added.';
          }
        })
        .error(function(data, status, headers, config) {
          $scope.message = 'Could not connect to Laddr. User not added.';
        });
    } else if ($scope.accountType == 'organization') {
      data = {
        //organization profile
        AccountType: 1,
        Email: $scope.user.email,
        Password: $scope.user.password1,
        OrganizationName: $scope.user.organizationName,
        AddressLine1: $scope.user.addressline1,
        AddressLine2: $scope.user.addressline2 || '', //can be null
        City: $scope.user.city,
        Province: $scope.user.province,
        Postal: $scope.user.postal,
        Picture: '',
        MissionStatement: '',
        URL: ''
      };
      $http
        .post('/api/organization', data)
        .success(function(data, status, headers, config) {
          if (data) {
            $scope.message = 'New organization added.';
            $location.url('/login');
          } else {
            $scope.message = 'We encountered an error and the organization wasn\'t added.';
          }
        })
        .error(function(data, status, headers, config) {
          $scope.message = 'Could not connect to Laddr. Organization not added.';
        });
    }
  }

}]);