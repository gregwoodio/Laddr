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

        $scope.profile = data;
        // $scope.profile.Email = data.Email;
        // $scope.profile.FirstName = data.FirstName;
        // $scope.profile.LastName = data.LastName;
        $scope.profile.PictureURL = 'https://www.orthoneuro.com/wp-content/themes/orthoneuro/images/generic-profile.jpg';
        // $scope.profile.AccountType = data.AccountType;
        // $scope.profile.Description = data.Description;
        // $scope.profile.Resume = data.Resume;
        // $scope.profile.AcademicStatus = data.AcademicStatus;
        // $scope.profile.OrganizationName = data.OrganizationName;
        // $scope.profile.Address = data.Address;
        // $scope.profile.URL = data.URL;
        // $scope.profile.MissionStatement = data.MissionStatement;
       
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

laddrControllers.controller('EditProfileController', ['$scope', '$http', '$routeParams', '$location', '$sessionStorage',
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
        $scope.profile = data;
        $scope.logout = true;
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
      FirstName: $scope.profile.FirstName,
      LastName: $scope.profile.LastName,
      AcademicStatus: $scope.profile.AcademicStatus,
      Description: $scope.profile.Description,
      Email: $scope.profile.Email,
    };

    console.log(data);

    $http
      .put('/api/user', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
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
        $location.url('/login');
      });
  };

  $scope.editOrganization = function() {
    data = {
      Email: $scope.profile.Email,
      OrganizationName: $scope.profile.OrganizationName,
      URL: $scope.profile.URL,
      MissionStatement: $scope.profile.MissionStatement,
      AddressLine1: $scope.profile.AddressLine1,
      AddressLine2: $scope.profile.AddressLine2,
      City: $scope.profile.City,
      Province: $scope.profile.Province,
      Postal: $scope.profile.Postal
    };

    console.log(data);

    $http
      .put('/api/organization', data, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
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
        $location.url('/login');
      });
  };
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

  console.log('TwitterLoginController');
  console.log($routeParams.token);

  if ($routeParams.token) {
    $scope.$storage.ldrToken = $routeParams.token;
    $location.url('/profile');
  } else {
    $location.url('/login');
  }
}]);

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

laddrControllers.directive('toggletype', function() {

  console.log('toggletype directive called.');

  return function(scope, element, attrs) {

    console.log(element);

    scope.$watch(attrs.toggletype, function(value, oldValue) {
      if (value) {
        element.hide();
      } else {
        element.show();
      }
    }, true);
  }
});