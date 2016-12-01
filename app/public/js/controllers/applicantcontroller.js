// ApplicantController.js

<<<<<<< HEAD
laddrControllers.controller('ApplicantController', ['$scope', '$http', '$location', 'LoginService',
  function($scope, $http, $location, LoginService) {
      
  /* Peter's NG-Modal Popup */
  
  /* End Here for Modal */      
      
=======
laddrControllers.controller('ApplicantController', ['$scope', '$http', '$location', '$uibModal', 'LoginService',
  function($scope, $http, $location, $uibModal, LoginService) {

>>>>>>> 91632f0faf1b696b5616a365d2cde3d64e5c267a
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

/* Modal Open/Close */
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  $ctrl.open = function(size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function() {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $ctrl.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $ctrl.toggleAnimation = function() {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function() {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});