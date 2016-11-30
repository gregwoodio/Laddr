// ApplicantController.js

laddrControllers.controller('ApplicantController', ['$scope', '$http', '$location', 'LoginService',
  function($scope, $http, $location, LoginService) {

  $scope.applications = {};

  $scope.updateApplication = function(newValue, profileID, postingID) {
    // console.log('Value: ' + newValue + ' PostingID: ' + postingID);
    data = {
      ApplicationStatus: newValue,
      PostingID: postingID,
      ProfileID: profileID
        
    }
  
    
    $http.put('/api/apply', data, {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.message = 'Updated.';
      })
      .error(function(data, status, headers, config) {
        $scope.message = 'Error updating, try again later.';
      });
      
      document.getElementById('updateAlert').style.display = "block";
  }
  

  if (LoginService.isLoggedIn()) {
    $http.get('/api/applicants', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.applications = data.applications;

      })
      .error(function(data, status, headers, config) {
        $scope.errorMessage = 'Couldn\'t retrieve your applications! Please try again later.';
      });
  } else {
    $location.url('/login');
  }
      

}]);


