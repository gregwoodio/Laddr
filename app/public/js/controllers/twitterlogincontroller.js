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