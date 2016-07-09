// laddr_controllers.js

var laddrControllers = angular.module("laddrControllers", []); //normally [] contains dependencies

laddrControllers.controller('HomePartialController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        
}]);

laddrControllers.controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
	
    if (window.sessionStorage.ldrToken != undefined) {

        $scope.profile = {};

        $http
            .get('/api/profile', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                }
            })
            .success(function(data, status, headers, config) {

                $scope.profile.Username = data.Username;
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
            })
            .error(function(data, status, headers, config) {
                console.log("Could not retrieve user.");
                $location.url('/login');
            });
    } else {
        $location.url('/login');
    }
}]);

laddrControllers.controller('LoginController', ['$scope', '$http', '$routeParams', "$location", function($scope, $http, $routeParams, $location) {
    
    $scope.login = function() {

        data = {
            Username: $scope.user.username,
            Password: $scope.user.password
        };

        $http
            .post('/api/login', data)
            .success(function(data, status, headers, config) {
                if (data.success) {
                    window.sessionStorage.ldrToken = data.token;
                    $location.url('/profile');
                } else {
                    console.log("Bad login");
                }
            })
            .error(function(data, status, headers, config) {
                delete window.sessionStorage.ldrToken;
                console.log("Bad login");
            });
    };
}]);

laddrControllers.controller('HowToController', function() {

});

laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {
    
    $scope.postings = {};

    if (window.sessionStorage.ldrToken != undefined) {
        $http
            .get('/api/posting', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                }
            })
            .success(function(data, status, headers, config) {
                $scope.postings = data;
            })
            .error(function(data, status, headers, config) {
                //couldn't get postings
                $scope.message = "Could not retrieve postings. Please try again later.";
            });
    } else {
        $location.url('/login');
    }
}]);

laddrControllers.controller('PostingsDetailController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {

    $scope.posting = {};

    if (window.sessionStorage.ldrToken != undefined) {
        $http
            .get('/api/posting', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                },
                params: {
                    'id': $routeParams.id
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
            })
            .error(function(data, status, headers, config) {
                //couldn't get postings
                $scope.message = "Could not retrieve posting. Please try again later.";
            });
    } else {
        $location.url('/login');
    }

}]);

laddrControllers.controller('TopicController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {
    
    $scope.topic = {};

    if (window.sessionStorage.ldrToken != undefined) {
        $http
            .get('/api/topic', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                },
                params: {
                    'tid': $routeParams.id
                }
            })
            .success(function(data, status, headers, config) {

                $scope.topic = data;

                //nested api calls?
                $http
                    .get('/api/comment', {
                        headers: {
                            'x-access-token': window.sessionStorage.ldrToken
                        },
                        params: {
                            'tid': $routeParams.id
                        }
                    })
                    .success(function(data, status, headers, config) {

                        $scope.topic.comments = data;
                        console.log($scope.topic);

                    })
                    .error(function(data, status, headers, config) {
                        $scope.message = "Could not retrieve topic. Please try again later.";
                    });
                
            })
            .error(function(data, status, headers, config) {
                //couldn't get topic
                $scope.message = "Could not retrieve topic. Please try again later.";
            });
    } else {
        $location.url('/login');
    }

}]);

laddrControllers.controller('AllTopicsController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.topics = [];

    if (window.sessionStorage.ldrToken != undefined) {
        $http
            .get('/api/topic', {
                headers: {
                    'x-access-token': window.sessionStorage.ldrToken
                }
            })
            .success(function(data, status, headers, config) {

                $scope.topics = data;

            })
            .error(function(data, status, headers, config) {
                //couldn't get topic
                $scope.message = "Could not retrieve topic. Please try again later.";
            });
    } else {
        $location.url('/login');
    }
}]);