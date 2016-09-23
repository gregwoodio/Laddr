// laddr_controllers.js

var laddrControllers = angular.module("laddrControllers", []); //normally [] contains dependencies

laddrControllers.controller('HomePartialController', ['$scope', '$http', '$routeParams', '$sessionStorage', 
	function ($scope, $http, $routeParams, $sessionStorage) {
  
  $scope.logout = false;
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {
    $scope.logout = true;
  }
}]);

laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 
	function($scope, $http, $routeParams, $location, $sessionStorage) {
	
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {

    $scope.profile = {};
    $scope.logout = false;

    $http
      .get('/api/profile', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.profile.Email = data.Email;
        $scope.profile.FirstName = data.FirstName;
        $scope.profile.LastName = data.LastName;
        $scope.profile.PictureURL = data.PictureURL;
        $scope.profile.AccountType = data.AccountType;
        $scope.profile.Description = data.Description;
        $scope.profile.Resume = data.Resume;
        $scope.profile.AcademicStatus = data.AcademicStatus;
        $scope.profile.OrganizationName = data.OrganizationName;
        $scope.profile.Address = data.Address;
        $scope.profile.URL = data.URL;
        $scope.profile.MissionStatement = data.MissionStatement;
       
        //show logout button
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        console.log("Could not retrieve user.");
        $location.url('/login');
      });
  } else {
    $location.url('/login');
  }
}]);

laddrControllers.controller('LoginController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage', 
	function($scope, $http, $routeParams, $location, $sessionStorage) {
    
  $scope.$storage = $sessionStorage;

  $scope.login = function() {

    data = {
      Email: $scope.user.email,
      Password: $scope.user.password
    };

    $http
      .post('/api/login', data)
      .success(function(data, status, headers, config) {
        if (data) {
          $scope.$storage.ldrToken = data.token;
          $location.url('/profile');
        } else {
          console.log("Bad login 1");
        }
      })
      .error(function(data, status, headers, config) {
        $scope.$storage.ldrToken = null;
        console.log("Bad login 2");
      });
  };
}]);

laddrControllers.controller('TwitterLoginController', ['$scope', '$routeParams', '$location', '$sessionStorage', 
  function($scope, $routeParams, $location, $sessionStorage) {
  $scope.$storage = $sessionStorage;

  console.log('TwtiterLoginController');
  console.log($routeParams.token);

  if ($routeParams.token) {
    $scope.$storage.ldrToken = $routeParams.token;
    $location.url('/profile');
  } else {
    $location.url('/login');
  }
}]);

laddrControllers.controller('HowToController', ['$scope', '$location', '$sessionStorage', 
	function($scope, $location, $sessionStorage) {

  $scope.$storage = $sessionStorage;
  $scope.logout = false;

  if ($scope.$storage.ldrToken != undefined) {
    $scope.logout = true;
  } else {
    $location.url('/login');
  }
    
}]);

laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 
	function($scope, $location, $http, $routeParams, $sessionStorage) {
    
  $scope.postings = {};
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {
    $http
      .get('/api/posting', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        $scope.postings = data;

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve postings. Please try again later.";
      });
  } else {
    $location.url('/login');
  }
}]);

laddrControllers.controller('PostingsDetailController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 
	function($scope, $location, $http, $routeParams, $sessionStorage) {

  $scope.posting = {};
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {

    console.log($routeParams);

    $http
      .get('/api/posting/' + $routeParams.id, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.posting.OrganizationName = data.OrganizationName;
        $scope.posting.JobTitle = data.JobTitle;
        $scope.posting.Location = data.Location;
        $scope.posting.Description = data.Description;
        $scope.posting.Timestamp = data.Timestamp;
        $scope.posting.Address = data.Address;
        $scope.posting.MissionStatement = data.MissionStatement;
        $scope.posting.PictureURL = data.PictureURL;

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve posting. Please try again later.";
      });
  } else {
    $location.url('/login');
  }

}]);

laddrControllers.controller('TopicController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 
	function($scope, $location, $http, $routeParams, $sessionStorage) {
    
  $scope.topic = {};
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {
    // $http
    //   .get('/api/topic', {
    //     headers: {
    //       'x-access-token': $scope.$storage.ldrToken
    //     },
    //     params: {
    //       'tid': $routeParams.id
    //     }
    //   })
    //   .success(function(data, status, headers, config) {

    //     $scope.topic = data;

    //     //show logout
    //     $scope.logout = true;

    //     //nested api calls?
    $http
      .get('/api/topic/' + $routeParams.id, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.topic = data.topic;
        $scope.comments = data.comments;

      })
      .error(function(data, status, headers, config) {
        $scope.message = "Could not retrieve topic. Please try again later.";
      });
          
      // })
      // .error(function(data, status, headers, config) {
      //   //couldn't get topic
      //   $scope.message = "Could not retrieve topic. Please try again later.";
      // });
  } else {
    $location.url('/login');
  }
}]);

laddrControllers.controller('AllTopicsController', ['$scope', '$location', '$http', '$sessionStorage', function($scope, $location, $http, $sessionStorage) {
  $scope.$storage = $sessionStorage;
  $scope.topics = [];

  if ($scope.$storage.ldrToken != undefined) {
    $http
      .get('/api/topic', {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.topics = data;

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get topic
        $scope.message = "Could not retrieve topic. Please try again later.";
      });
  } else {
    $location.url('/login');
  }
}]);

laddrControllers.controller('AddTopicController', ['$location', '$scope','$http', '$sessionStorage', 
  function($location, $scope, $http, $sessionStorage) {

  $scope.$storage = $sessionStorage;
  $scope.logout = true;

  $scope.submitTopic = function() {

    data = {
      Title: $scope.topic.title,
      Body: $scope.topic.body
    };

    $http
      .post('/api/topic', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {
        if (data) {
          $location.url('/forum');
        } else {
          console.log('Failed to add topic.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('Failed to add topic, part 2.');
      });
  }

}]);

laddrControllers.controller('LogoutController', ['$location', '$scope', '$sessionStorage', 
  function($location, $scope, $sessionStorage) {
  $scope.$storage = $sessionStorage;
  $scope.$storage.ldrToken = null;

  $scope.$evalAsync(function(){
    $location.url('/login');
  });
}]);