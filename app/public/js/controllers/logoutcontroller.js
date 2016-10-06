laddrControllers.controller('LogoutController', ['$location', '$scope', '$rootScope', '$sessionStorage', 'LoginService',
  function($location, $scope, $sessionStorage, $rootScope, LoginService) {
  $scope.$storage = $sessionStorage;
  $scope.$storage.ldrToken = null;
  LoginService.setProfile(null);
  console.log('Logged in? ' + LoginService.isLoggedIn());
  $scope.isLoggedIn = LoginService.isLoggedIn();

  $scope.$evalAsync(function(){
    $location.url('/login');
  });
}]);