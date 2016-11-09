laddrControllers.controller('EditProfileController', ['$scope', '$http', '$routeParams', '$location', 'LoginService', 'Upload',
  function($scope, $http, $routeParams, $location, LoginService, Upload) {

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
        console.log($scope.imageUpload);
        $scope.isLoggedIn = LoginService.isLoggedIn();

        $scope.asyncSelected = $scope.profile.LdrOrganization.AddressLine1 + ", " + $scope.profile.LdrOrganization.City + ", " +
          $scope.profile.LdrOrganization.Province + ", " + $scope.profile.LdrOrganization.Postal;
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
          'x-access-token': LoginService.getToken()
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
      Postal: $scope.profile.LdrOrganization.Postal,
      Lat: $scope.profile.lat,
      Lng: $scope.profile.lng
    };

    console.log(data);

    $http
      .put('/api/organization', data, {
        headers: {
          'x-access-token': LoginService.getToken()
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

  // $scope.uploadAvatar = function(){ //function to call on form submit
  //   if (imageuploadform.file.$valid && $scope.avatar) { //check if from is valid
  //     $scope.upload($scope.avatar); //call upload function
  //   } else {
  //     console.log('didn\'t work');
  //     console.log('$scope.avatar:');
  //     console.log($scope.avatar);
  //     console.log('imageuploadform.file.$valid:');
  //     console.log(imageuploadform.file.$valid);
  //   }
  // }

  // $scope.upload = function(file) {
  //   Upload.upload({
  //     url: '/api/imageupload',
  //     data: {
  //       file: file, 
  //       // ProfileID: LoginService.getProfile().ProfileID
  //     }
  //   }).then(function (resp) {
  //     console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
  //   }, function (err) {
  //     console.log('Error status: ' + err.status);
  //   }, function (evt) {
  //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
  //   });
  // };

  $scope.uploadFile = function() {

    console.log('uploadFile() called');
    $scope.fileSelected($files);
  };

  $scope.fileSelected = function(files) {
      console.log('fileSelected() called');

      console.log('files');
      console.log(files);
      console.log(files.length);
      
      // if (files && files.length) {
      //   $scope.file = files[0];
      // }

      Upload.upload({
        url: '/api/imageupload',
        arrayKey: '',
        file: files
      })
      .success(function(data) {
        console.log(data, 'uploaded');
      })
      .catch(function(err) {
        console.log('Error: ' + err.message);
      });
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

    console.log($scope.address);

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
