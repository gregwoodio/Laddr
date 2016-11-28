laddrControllers.controller('FeedController', ['$scope', '$http', '$routeParams', '$location', 'LoginService',
  function($scope, $http, $routeParams, $location, LoginService) {
  
  $scope.profile = undefined;
  $scope.postings = undefined;
  $scope.topics = undefined;
  $scope.showMessages = true;

  if (LoginService.isLoggedIn()) {

    $scope.profile = {};
    $scope.isLoggedIn = true;

    // profile info
    $http
      .get('/api/profile', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.profile = data;
        if ($scope.profile.PictureURL == undefined || $scope.profile.PictureURL == 'pic.jpg') {
          $scope.profile.PictureURL = 'https://www.orthoneuro.com/wp-content/themes/orthoneuro/images/generic-profile.jpg';
        }
        $scope.showMessages = $scope.profile.LdrUser.ShowMessage || false;

      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve user.");
        $location.url('/login');
      });

    $http
      .get('/api/feed/' + LoginService.getProfile().ProfileID, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        
        $scope.postings = data.postings.slice(0,5);
        console.log($scope.postings);

      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve feed.");
        $location.url('/login');
      });

    $http
      .get('/api/topic', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        $scope.topics = data.slice(0,4);
        console.log($scope.topics);
      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve topics.");
        // $location.url('/login');
      });

  } else {
    $location.url('/login');
  }

  $scope.dismissMessages = function() {
    $scope.showMessages = false;
    
    //verify notifications have been seen
    $http.post('/api/applications', undefined, {
      headers: {
        'x-access-token': LoginService.getToken()
      }
    })
    .success(function(data, status, headers, config) {
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  };

}]);
