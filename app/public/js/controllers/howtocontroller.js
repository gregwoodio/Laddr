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