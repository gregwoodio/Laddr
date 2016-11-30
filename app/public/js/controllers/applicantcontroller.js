// ApplicantController.js

laddrControllers.controller('ApplicantController', ['$scope', '$http', '$location', '$uibModal', 'LoginService',
  function($scope, $http, $location, $uibModal, LoginService) {

  $scope.applications = {};
  $scope.resume = "";

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

  $scope.open = function (index, size, parentSelector) {

    $scope.resume = $scope.applications[index].LdrProfile.LdrUser.Resume;

    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $scope.modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'resumeModal.html',
      size: size,
      appendTo: parentElem,
      scope: $scope
    });

  };

}]);


