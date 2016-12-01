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
      // console.log(data);
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
        $scope.eventDate = new Date($scope.posting.EventDate);
        $scope.deadline = new Date($scope.posting.Deadline);

        for (i = 0; i < $scope.tags.length; i++) {
          $scope.tags[i].Enabled = false;
        }
        for (i = 0; i < $scope.posting.LdrPostingTags.length; i++) {
          for (j = 0; j < $scope.tags.length; j++) {
            if ($scope.tags[j].TagID == $scope.posting.LdrPostingTags[i].TagID) {
              $scope.tags[j].Enabled = true;
            }
          }
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

    $scope.posting.Location = $scope.asyncSelected;
    $scope.posting.Tags = $scope.tags;
    $scope.posting.EventDate = $scope.eventDate;
    $scope.posting.Deadline = $scope.deadline;

		$http.put('/api/posting', $scope.posting, {
				headers: {
					'x-access-token': LoginService.getToken() 
				}
			})
			.success(function(data, status, headers, config) {
				if(data) {
					$location.url('/postings');
				} else {
					// console.log('Failed to edit posting');
				}
			})
			.error(function(data, status, headers, config) {
				
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
        // console.log(item);
        $scope.posting.Location = item.formatted_address;
        $scope.posting.Lat = item.geometry.location.lat;
        $scope.posting.Lng = item.geometry.location.lng;
        // console.log($scope.posting);
        return item.formatted_address;
      });
    });
  };

  // uib-datepicker-popup
  $scope.today = function() {
    $scope.eventDate = new Date();
    $scope.deadline = new Date();
    $scope.deadline.setDate($scope.eventDate.getDate() - 2);
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };

  $scope.deadlineOptions = {
    formatYear: 'yy',
    minDate: null,
    maxDate: $scope.eventDate,
    startingDay: 0
  }

  $scope.openEventDate = function() {
    $scope.eventDatePopup.opened = true;
  };

  $scope.eventDatePopup = {
    opened: false
  };

  $scope.openDeadline = function() {
    $scope.deadlinePopup.opened = true;
  };

  $scope.deadlinePopup = {
    opened: false
  };

  $scope.setDate = function(year, month, day) {
    $scope.eventDate = new Date(year, month, day);
  };

  $scope.updateDeadline = function(date) {
    $scope.deadlineOptions.maxDate = date;
  }

  $scope.altInputFormats = ['M!/d!/yyyy'];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

}]);
