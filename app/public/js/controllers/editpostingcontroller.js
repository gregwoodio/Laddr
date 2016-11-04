//edit posting controller 
laddrControllers.controller('EditPostingController', ['$scope', '$location', '$http', '$routeParams', 'LoginService',
  function($scope, $location, $http, $routeParams, LoginService) {

  $scope.posting = {};

  if (LoginService.isLoggedIn() != undefined) {

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

    $http
      .get('/api/posting/' + $routeParams.id, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.posting = data;
        $scope.asyncSelected = $scope.posting.Location;
        console.log($scope.posting);
        console.log('Tags length: ' + $scope.tags.length);
        $scope.posting.tags = [];
        for (i = 0; i < $scope.tags.length; i++) {
          $scope.posting.tags.push(false); 
        }
        for (i = 0; i < $scope.posting.LdrPostingTags.length; i++) {
          $scope.posting.tags[$scope.posting.LdrPostingTags[i].LdrTag.TagID] = true ;
        }
    		$scope.isLoggedIn = LoginService.isLoggedIn();

      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = 'Could not retrieve posting. Please try again later.';
      });
  } else {
    $location.url('/login');
  }

	//edit posting
	$scope.editPosting = function() {

    console.log('scope.editPosting');
    $scope.posting.Location = $scope.asyncSelected;

		// data = {
		// 	ProfileID: LoginService.getProfile().ProfileID,
		// 	PostingID: $scope.posting.PostingID,
		// 	JobTitle: $scope.posting.JobTitle,
		// 	Lat: undefined,
		// 	Lng: undefined,
		// 	Description: $scope.posting.Description,
		// 	Tags: []
		// };
		
		console.log($scope.posting);
		
		$http
			.put('/api/posting', $scope.posting, {
				headers: {
					'x-access-token': LoginService.getToken() 
				}
			})
			.success(function(data, status, headers, config) {
				console.log("Successful edit.");
				if(data) {
					$location.url('/postings');
				} else {
					console.log('Failed to edit posting');
				}
			})
			.error(function(data, status, headers, config) {
				console.log('Failed to add posting, part 2.');
				console.log(data);
				console.log(status);				
		  });
	};

  // $scope.addPosting = function() {

  //   $scope.posting.Location = $scope.asyncSelected;
  //   data = $scope.posting;

  //   console.log(data);
  //   console.log(data.Tags);

  //   $http
  //     .post('/api/posting', data, {
  //       headers: {
  //         'x-access-token': LoginService.getToken()
  //       }
  //     })
  //     .success(function(data, status, headers, config) {
  //       if (data) {
  //         $location.url('/postings');
  //       } else {
  //         console.log('Failed to add posting.');
  //       }
  //     })
  //     .error(function(data, status, headers, config) {
  //       console.log('Failed to add posting, part 2.');
  //       console.log(data);
  //       console.log(status);
  //     });
  // };
  
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