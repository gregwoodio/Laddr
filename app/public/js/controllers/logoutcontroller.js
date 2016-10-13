laddrControllers.controller('LogoutController', ['$location', '$scope', 'LoginService',
  function($location, $scope, LoginService) {

  LoginService.setProfile(null);
  $scope.isLoggedIn = LoginService.isLoggedIn();

  $scope.$evalAsync(function(){
    $location.url('/login');
  });
  
}]);