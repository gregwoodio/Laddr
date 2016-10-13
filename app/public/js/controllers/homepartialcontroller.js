laddrControllers.controller('HomePartialController', ['$scope', '$http', 'LoginService',
  function ($scope, $http, LoginService) {
  
  if (LoginService.isLoggedIn()) {
    $scope.isLoggedIn = true;
    $scope.isUser = LoginService.getProfile().AccountType == 0;
  } else {
    $scope.isLoggedIn = false;
  }
  
}]);