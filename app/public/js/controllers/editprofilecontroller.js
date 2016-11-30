laddrControllers.controller('EditProfileController', ['$scope', '$http', '$routeParams', '$location', '$timeout', 'LoginService', 'Upload',
  function($scope, $http, $routeParams, $location, $timeout, LoginService, Upload) {

  if (LoginService.isLoggedIn()) {
    $scope.profile = {};
    $scope.logout = false;

    $http
      .get('/api/profile', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.profile = data;
        // console.log($scope.imageUpload);
        $scope.isLoggedIn = LoginService.isLoggedIn();

        $scope.asyncSelected = $scope.profile.LdrOrganization.AddressLine1 + ", " + $scope.profile.LdrOrganization.City + ", " +
          $scope.profile.LdrOrganization.Province + ", " + $scope.profile.LdrOrganization.Postal;
      })
      .error(function(data, status, headers, config) {
        // console.log('Could not retrieve user.');
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

    // console.log(data);

    $http
      .put('/api/user', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        // console.log('Successful edit.');
        if (data) {
          
          $location.url('/profile');
        } else {
          console.log('Edit volunteer failed.');
        }
      })
      .error(function(data, status, headers, config) {
        // console.log('AJAX error editing profile.');
        // console.log(data);
        // console.log(status);
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
      Postal: $scope.profile.LdrOrganization.Postal,
      Lat: $scope.profile.lat,
      Lng: $scope.profile.lng
    };

    // console.log(data);

    $http
      .put('/api/organization', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        // console.log('Successful edit.');
        if (data) {
          $location.url('/profile');
        } else {
          // console.log('Edit volunteer failed.');
        }

      })
      .error(function(data, status, headers, config) {
        // console.log('AJAX error editing profile.');
        // console.log(data);
        // console.log(status);
        $scope.message = 'Error updating profile. Please try again later.';
      });
  };

  $scope.upload = function(file) {

    if (file) {
      Upload.upload({
        url: '/api/imageupload',
        data: {
          file: file,
        },
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .then(function(res) {

        $scope.successfulUpload = true; 

        $timeout(function () {
          $scope.successfulUpload = false; 
        }, 3000);

        // console.log(res);
      });
    } else {
      // console.log("file is undefined");
    }
  };

  //typeahead
  _selected = undefined;
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
          $scope.profile.LdrOrganization.City = $scope.address.address_components[i].long_name;
        } else if ($scope.address.address_components[i].types[j] == "administrative_area_level_1") {
          $scope.profile.LdrOrganization.Province = $scope.address.address_components[i].short_name;
        } else if ($scope.address.address_components[i].types[j] == "postal_code") {
          $scope.profile.LdrOrganization.Postal = $scope.address.address_components[i].short_name;
        }
      }
    }

    $scope.profile.LdrOrganization.AddressLine1 = street_number + " " + route;
    
    $scope.profile.lat =  $scope.address.geometry.location.lat;
    $scope.profile.lng =  $scope.address.geometry.location.lng;
  }

}]);
