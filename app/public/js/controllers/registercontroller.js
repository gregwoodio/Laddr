laddrControllers.controller('RegisterController', ['$scope', '$http', '$location', '$sessionStorage', '$animate', 
  function($scope, $http, $location, $sessionStorage, $animate) {

  $scope.accountType = 'volunteer';
  //$scope.showVolunteer = false;

  $scope.register = function() {

    if ($scope.user.password1 != $scope.user.password2) {
      return 'Passwords don\'t match.'
    }

    if ($scope.accountType == 'volunteer') {

      console.log($scope.user.email);
      console.log($scope.user.password1);
      console.log($scope.user.firstName);
      console.log($scope.user.lastName);
      console.log($scope.user.academicStatus);

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
            console.log('New user added.');
            $location.url('/login');
          } else {
            console.log('User not added - db error.');
          }
        })
        .error(function(data, status, headers, config) {
          console.log('User not added - AJAX error.');
          console.log(data);
          console.log(status);
        });
    } else if ($scope.accountType == 'organization') {
      data = {
        //organization profile
        AccountType: 1,
        Email: $scope.user.email,
        Password: $scope.user.password1,
        OrganizationName: $scope.user.organizationName,
        AddressLine1: $scope.user.addressline1,
        AddressLine2: $scope.user.addressline2,
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
            console.log('New organization added.');
            $location.url('/login');
          } else {
            console.log('Organization not added - db error.');
          }
        })
        .error(function(data, status, headers, config) {
          console.log('Organization not added - AJAX error.');
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        });
    }
  }

}]);