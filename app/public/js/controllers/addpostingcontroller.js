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
    $scope.posting.EventDate = $scope.eventDate;
    $scope.posting.Deadline = $scope.deadline;

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

  // datepicker popup
  $scope.today = function() {
    $scope.eventDate = new Date();
    $scope.deadline = new Date();
    $scope.deadline.setDate($scope.eventDate.getDate() - 2);
  };
  $scope.today();

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