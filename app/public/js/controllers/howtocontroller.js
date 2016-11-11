laddrControllers.controller('HowToController', ['$scope', '$location', 'LoginService', 
  function($scope, $location, LoginService) {

  if (LoginService.isLoggedIn()) {
    $scope.isLoggedIn = true;
    $scope.isUser = LoginService.getProfile().AccountType == 0;
  } else {
    $location.url('/login');
  }
    
}]);