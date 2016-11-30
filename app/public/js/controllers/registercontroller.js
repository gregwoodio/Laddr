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
        Picture: 'img/uploads/generic.jpg',
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
        AddressLine1: $scope.user.AddressLine1,
        AddressLine2: $scope.user.addressline2 || '', //can be null
        City: $scope.user.City,
        Province: $scope.user.Province,
        Postal: $scope.user.Postal,
        Picture: 'img/uploads/generic.jpg',
        MissionStatement: '',
        URL: '',
        Lat: $scope.user.lat,
        Lng: $scope.user.lng
      };

      // console.log(data);

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

  //typeahead
  $scope.address = undefined;

  $scope.getLocation = function(val) {
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        key: 'AIzaSyCeGQJ4JcHtOvW4ooRX6Od_ENGJgJoW1t4',
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        $scope.address = item;
        return item.formatted_address;
      });
    });
  };

  $scope.setAddress = function() {

    // console.log($scope.address);

    street_number = undefined;
    route = undefined;

    for (i = 0; i < $scope.address.address_components.length; i++) {
      for (j = 0; j < $scope.address.address_components[i].types.length; j++) {
        if ($scope.address.address_components[i].types[j] == "street_number") {
          street_number = $scope.address.address_components[i].long_name;
        } else if ($scope.address.address_components[i].types[j] == "route") {
          route = $scope.address.address_components[i].long_name;
        } else if ($scope.address.address_components[i].types[j] == "locality") {
          $scope.user.City = $scope.address.address_components[i].long_name;
        } else if ($scope.address.address_components[i].types[j] == "administrative_area_level_1") {
          $scope.user.Province = $scope.address.address_components[i].short_name;
        } else if ($scope.address.address_components[i].types[j] == "postal_code") {
          $scope.user.Postal = $scope.address.address_components[i].short_name;
        }
      }
    }

    $scope.user.AddressLine1 = street_number + " " + route;
    
    $scope.user.lat =  $scope.address.geometry.location.lat;
    $scope.user.lng =  $scope.address.geometry.location.lng;
  }

}]);