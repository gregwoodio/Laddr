laddrControllers.controller('HomePartialController', ['$scope', '$http', '$routeParams', '$sessionStorage', 
  function ($scope, $http, $routeParams, $sessionStorage) {
  
  $scope.logout = false;
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {
    $scope.logout = true;
  }
}]);