laddrControllers.controller('AddPostingController', ['$location', '$scope','$http', 'LoginService',
  function($location, $scope, $http, LoginService) {

  if (!LoginService.isLoggedIn()) {
    $location.url('/login');
  }

  //get default location
  $http.get('/api/organization', {
      params: {
        ProfileID: LoginService.getProfile().ProfileID
      },
      headers: {
        'x-access-token': LoginService.getToken()
      }
    })
    .success(function(data, status, headers, config) {
      $scope.posting = {
        ProfileID: LoginService.getProfile().ProfileID,
        JobTitle: undefined,
        Lat: data.Lat,
        Lng: data.Lng,
        Description: undefined,
        Tags: []
      };

      $scope.asyncSelected = data.AddressLine1 + ", " + data.City + ", " + data.Province + ", " + data.Postal;      
    })
    .error(function(data, status, headers, config) {
      $scope.posting = {
        ProfileID: LoginService.getProfile().ProfileID,
        JobTitle: undefined,
        Lat: undefined,
        Lng: undefined,
        Description: undefined,
        Tags: []
      };
    });

  //get list of tags
  $http.get('/api/tag', {
    headers: {
      'x-access-token': LoginService.getToken()
    }
  })
  .success(function(data, status, headers, config) {
    $scope.tags = data;
  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });

  $scope.addPosting = function() {

    $scope.posting.Location = $scope.asyncSelected;
    data = $scope.posting;

    $http
      .post('/api/posting', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        if (data) {
          $location.url('/postings');
        } else {
          console.log('Failed to add posting.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('Failed to add posting, part 2.');
        console.log(data);
        console.log(status);
      });
  };

  //typeahead
  _selected = undefined;

  $scope.getLocation = function(val) {
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        key: 'AIzaSyCeGQJ4JcHtOvW4ooRX6Od_ENGJgJoW1t4',
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        $scope.posting.Location = item.formatted_address;
        $scope.posting.Lat =  item.geometry.location.lat;
        $scope.posting.Lng =  item.geometry.location.lng;
        return item.formatted_address;
      });
    });
  };
}]);