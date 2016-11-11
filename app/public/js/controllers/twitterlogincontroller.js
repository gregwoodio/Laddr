laddrControllers.controller('TwitterLoginController', ['$scope', '$routeParams', '$location', 'LoginService', 
  function($scope, $routeParams, $location, LoginService) {

  console.log('TwitterLoginController');
  console.log($routeParams.token);

  if ($routeParams.token) {
    //$scope.$storage.ldrToken = $routeParams.token;
    $location.url('/profile');
  } else {
    $location.url('/login');
  }
}]);